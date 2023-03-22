import React, { useState, useEffect } from "react";
import FileList from "./FileList";
import WebsiteService from "../../services/websites.service";

const Dashboard = () => {
	const [websites, setWebsites] = useState("");
	const [details, setDetails] = useState("");

	useEffect(() => {
		WebsiteService.getWebsites().then(
			(response) => {
				console.log("getWebsitesResponse", response);
				let data = response.data;
				if (!data) {
					let dummy_data = {
						website_1: ["page1p", "apge2"],
						website_2: [
							"page2p",
							"apge2",
							"page3",
							"page2p",
							"apge2",
							"page3",
							"page2p",
							"apge2",
							"page3",
							"page2p",
							"apge2",
							"page3",
							"page2p",
							"apge2",
							"page3",
						],
						website_3: ["page1p", "apge2", "page3"],
						website_4: ["page1p", "apge2", "page3"],
						website_5: ["page1p", "apge2", "page3"],
						website_6: ["page1p", "apge2", "page3"],
						website_7: ["page1p", "apge2", "page3"],
						website_8: ["page1p", "apge2", "page3"],
					};
					setWebsites(dummy_data);
					return;
				}
				setWebsites(response.data);
			},
			(error) => {
				const _content =
					(error.response &&
						error.response.data &&
						error.response.data.message) ||
					error.message ||
					error.toString();

				setWebsites(_content);
			}
		);
	}, []);

	const showDetails = (websiteName) => {
		if (Object.keys(details)[0] == websiteName) {
			console.log("reset");
			setDetails("");
			return;
		}
		setDetails({ [websiteName]: websites[websiteName] });
		return;
	};
	return (
		<main className="mt-10 md:mt-32 w-full flex flex-col justify-around h-3/5">
			<h2 className="bg-color-bg-dark w-4/5 md:w-1/2 lg:w-1/3 mx-auto p-2 shadow-md rounded-md text-2xl font-bold text-center m-2">
				Dashboard
			</h2>
			<div className="bg-color-bg-dark w-4/5 md:w-1/2 lg:w-1/3 mx-auto p-5 shadow-md rounded-md  flex flex-col overflow-hidden">
				<ul className=" text-center overflow-scroll">
					{websites == "" ? (
						<li>No websites found</li>
					) : (
						Object.keys(websites).map((item, key) => {
							return (
								<li
									key={key}
									className="flex flex-col border-b border-gray-400 border-dashed mb-4 py-2 "
								>
									<p>{item}</p>
									<div className=" flex w-full justify-around  ">
										<button
											className="button px-2"
											onClick={() => showDetails(item)}
										>
											Details
										</button>
										<button className="button px-2">Update</button>
										<button className="button px-2">Delete</button>
									</div>
									{Object.keys(details)[0] == item ? (
										<FileList website={details[Object.keys(details)[0]]} />
									) : (
										false
									)}
								</li>
							);
						})
					)}
				</ul>
			</div>
		</main>
	);
};

export default Dashboard;
