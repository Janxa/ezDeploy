import React, { useState, useEffect, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faLaptopCode,
	faCircle,
	faGears,
	faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import WebsiteService from "../../../services/websites.service";
import ProgressBar from "../../Common/ProgressBar";
import LoadingWheel from "../../Common/LoadingWheel";
import Button from "../../Common/Button";
import RenderTreatedWebsites from "./RenderTreatedWebsites";
import { useNavigate } from "react-router-dom";
const Dashboard = () => {
	const [websites, setWebsites] = useState([]);
	const [details, setDetails] = useState("");
	const [pendingWebsites, setPendingWebsites] = useState([]);

	const [streamData, setStreamData] = useState({});
	const [loading, setLoading] = useState(false);

	const navigate = useNavigate();

	useEffect(() => {
		console.log("streamData updated:", streamData);
	}, [streamData]);

	const separateWebsites = (data) => {
		const pendingWebsites = [];
		const treatedWebsites = [];
		data.forEach((item) => {
			console.log("item=>", item);
			if (item.task == null) treatedWebsites.push(item);
			else pendingWebsites.push(item);
		});
		console.log({ pendingWebsites, treatedWebsites });
		return { pendingWebsites, treatedWebsites };
	};
	//inital websites fetch
	useEffect(() => {
		setLoading(true);
		WebsiteService.getWebsites().then(
			(response) => {
				console.log("getWebsitesResponse", response);
				let data = response.data;
				setLoading(false);
				if (!data) {
					setWebsites([]);
					setPendingWebsites([]);
					return;
				}
				const { pendingWebsites, treatedWebsites } = separateWebsites(data);
				setWebsites(treatedWebsites);
				setPendingWebsites(pendingWebsites);
			},
			(error) => {
				console.log(error);
				if (error.code == "ERR_NETWORK" || error.response.status == 401) {
					AuthService.logout();
					return navigate("/app/account", {
						state: { error: "Session expired, please reconnect" },
					});
				} else if (error.response.status == 500)
					return navigate("/app/account", {
						state: {
							error:
								"Server not available, please try again later or contact an admin",
						},
					});
			}
		);
	}, []);
	//handleStreamEvent
	const handleEvent = (event) => {
		const data = JSON.parse(event.data);

		const taskId = data.task_id;
		console.log("stream=>", data);
		console.log("pendingWebsites", pendingWebsites);
		if (data.state.toLowerCase() == "progress")
			setStreamData((prevStreamData) => ({
				...prevStreamData,
				[taskId]: data,
			}));
		else if (data.state.toLowerCase() == "success") {
			console.log("SUCCESS, Searching ", taskId, "in", pendingWebsites);
			const uploadedWebsite = pendingWebsites.find(
				(website) => website.task == taskId
			);
			const website_id = uploadedWebsite.id;
			console.log(pendingWebsites, website_id, uploadedWebsite);
			const newStreamData = { ...streamData };
			const newPendingWebsites = pendingWebsites.filter(
				(website) => website.task !== taskId
			);
			delete newStreamData[taskId];
			setStreamData(newStreamData);
			setPendingWebsites(newPendingWebsites);

			WebsiteService.getWebsiteById(website_id).then((response) => {
				console.log("getWebsitesByIdResponse", response);
				const newWebsites = [...websites];
				console.log("websites =>", websites, newPendingWebsites);
				let data = response.data;
				newWebsites.push(data);
				setWebsites(newWebsites);
			});
		}
	};
	//Initiate And close Stream
	useEffect(() => {
		let eventSources = [];
		if (pendingWebsites.length > 0) {
			eventSources = pendingWebsites.map((pendingWebsite) => {
				const eventSource = new EventSource(
					"/api/stream/task/" + pendingWebsite.task,
					{
						withCredentials: true,
					}
				);
				eventSource.onmessage = (event) => {
					handleEvent(event);
				};
				eventSource.onerror = (err) => {
					console.log("Event Source failed: ", err);
					if (eventSource.readyState === EventSource.CLOSED) {
						console.log("Event Source closed");
					} else {
						console.log("Event Source not closed");
					}
					eventSource.close();
				};
				eventSource.onclose = (event) => {
					const lastEvent = JSON.parse(event.lastEventId);
					console.log("last event data", lastEvent.data);
				};

				console.log("event source setup");
				return eventSource;
			});
		}
		return () => {
			eventSources.forEach((eventSource) => {
				console.log("closing", eventSource);
				eventSource.close();
			});
		};
	}, [pendingWebsites]);
	const renderProgress = (item) => {
		if (item.task in streamData) {
			const { state, info } = streamData[item.task];
			const status = state.toLowerCase();

			if (status === "pending" || (status === "progress" && !info)) {
				return <LoadingWheel />;
			} else if (status === "progress" && info) {
				return (
					<div
						className="w-full flex items-center flex-col
					 "
					>
						<ProgressBar value={info.index} max={info.total} />

						<p>{info.current}</p>
					</div>
				);
			} else if (status === "success") {
				return <p>Website uploaded,finalizing </p>;
			} else if (status === "failure") {
				return <p>Something went wrong please ty again</p>;
			}
		} else {
			return <LoadingWheel />;
		}
	};
	const showDetails = (websiteName) => {
		if (Object.keys(details)[0] == websiteName) {
			console.log("reset");
			setDetails("");
			return;
		}
		setDetails({ [websiteName]: websites[websiteName] });
		return;
	};
	const handleDelete = async (website_id) => {
		const previousWebsites = { ...websites };
		setWebsites((prevWebsites) =>
			prevWebsites.filter((website) => website.id !== website_id)
		);
		try {
			await WebsiteService.deleteWebsite(website_id);
		} catch (error) {
			if (error.response && error.response.status === 404) {
			} else {
				setWebsites(previousWebsites);
				// Handle other errors
				console.log("Error deleting website:", error);
				// Or show a message to the user
			}
		}
	};

	const handleCancel = async (website_id) => {
		try {
			await WebsiteService.cancelUpload(website_id);
			setPendingWebsites((prevWebsites) =>
				prevWebsites.filter((website) => website.id !== website_id)
			);
		} catch (error) {
			if (error.response && error.response.status === 404) {
				// Website not found or already deleted
				setWebsites((prevWebsites) =>
					prevWebsites.filter((website) => website.id !== website_id)
				);
			} else {
				// Handle other errors
				console.log("Error cancelling task:", error);
				// Or show a message to the user
			}
		}
	};
	return (
		<main className="mt-10 md:mt-32 w-full flex flex-col  ">
			<h2 className="bg-flat-700  w-4/5 md:w-1/2 lg:w-11/12 mx-auto p-2 text-2xl  font-bold text-center  shadow-md rounded-md m-2">
				Dashboard
			</h2>
			<div className="bg-flat-700 w-4/5  md:w-1/2 lg:w-11/12  mx-auto p-5 shadow-md rounded-md">
				{websites.length === 0 && pendingWebsites.length === 0 ? (
					loading ? (
						<LoadingWheel />
					) : (
						<p className="text-center">No websites found</p>
					)
				) : (
					<div className="grid grid-cols-6 overflow-visible lg:gap-y-8 h-full grid-flow-row-dense content-start">
						<div className="hidden lg:grid lg:grid-cols-6 lg:col-span-6 lg:gap-x-4 items ">
							<p className="underline decoration-[3px]  underline-offset-4 decoration-chili-500 w-fit">
								Website
							</p>
							<p className="underline decoration-[3px] underline-offset-4 decoration-chili-500 w-fit">
								Status
							</p>
							<p className="underline col-span-2 decoration-[3px] underline-offset-4  decoration-chili-500 w-fit">
								Link
							</p>
							<p className="underline decoration-[3px] underline-offset-4 decoration-chili-500 w-fit">
								Options
							</p>
						</div>
						<div className="grid col-span-6 gap-y-8 lg:grid-cols-">
							<RenderTreatedWebsites
								websites={websites}
								handleDelete={handleDelete}
							/>

							<div className="grid grid-cols-1 lg:gap-y-8 lg:pb-3 ">
								{pendingWebsites.map((item, key) => (
									<div
										key={key}
										className="grid grid-cols-2 lg:grid-cols-6 auto-rows-min gap-y-4   lg:gap-x-4 "
									>
										<p className="bg-chili-500 rounded-l-xl pl-4 lg:hidden">
											Website
										</p>
										<div className="pr-2 flex flex-row justify-left  items-center bg-chili-500 lg:bg-transparent rounded-r-xl">
											<FontAwesomeIcon icon={faLaptopCode} className="fa-sm" />

											<p className=" pl-2 w-full text-lefts">{item.name}</p>
										</div>
										<div className="w-full flex items-center col-span-3">
											{renderProgress(item)}
										</div>
										<Button
											extraStyle=""
											title="Cancel"
											onClick={() => handleCancel(item.id)}
										/>
									</div>
								))}
							</div>
						</div>
					</div>
				)}
			</div>
		</main>
	);
};

export default Dashboard;
