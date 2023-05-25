import { useState } from "react";
import { invalid_names, valid_extensions } from "../variables";
import { useNavigate } from "react-router-dom";
import exctractZipFile from "../services/zip.service";
import WebsiteService from "../services/websites.service";
import Button from "./Common/Button.jsx";
import LoadingWheel from "./Common/LoadingWheel";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Input from "./Common/Input?jsx";

function UploadWebsiteForm() {
	const [files, setFiles] = useState(null);
	const [errors, setErrors] = useState(false);
	const [loading, setLoading] = useState(false);
	const [uploading, setUploading] = useState(false);
	const [websiteName, setWebsitename] = useState("");
	let navigate = useNavigate();
	const handleFileUpload = async (event) => {
		setErrors(false);
		const zipFile = event.target.files[0];
		console.log(typeof zipFile);
		console.log(zipFile);
		setLoading(true);
		const file_list = await exctractZipFile(zipFile);
		let numberOfIndex = 0;
		const fileValidationFunctions = [
			validateFilenames,
			validateExtensions,
			validateSize,
		];

		// Validate all files
		try {
			for (let i = 0; i < file_list.length; i++) {
				const file = file_list[i];
				for (let j = 0; j < fileValidationFunctions.length; j++) {
					const validationFunction = fileValidationFunctions[j];
					validationFunction(file);
				}
				//Check if there is one, or more than one index.html
				numberOfIndex += isIndexHtml(file);
			}

			// If all files pass validation, update state
			if (numberOfIndex == 1) setFiles(zipFile);
			else
				throw new Error(`The zipfile must one, and only one index.html file`);
		} catch (error) {
			// Handle validation errors

			setErrors(error);
		} finally {
			setLoading(false);
		}
	};
	const handleChange = (event) => {
		const newWebsiteName = event.target.value;
		setWebsitename(newWebsiteName);
	};
	const handleSubmit = async (event) => {
		event.preventDefault();
		setUploading(true);
		try {
			const uploadResponse = await WebsiteService.uploadWebsite(
				files,
				websiteName
			);
			localStorage.setItem(
				uploadResponse.data.website_name,
				uploadResponse.data.task_id
			);
			setUploading("done");
			return navigate("/app/dashboard");
		} catch (e) {
			console.log("this is the error:", e.response);
		}
	};

	// File validation functions
	const validateFilenames = (file) => {
		if (file.name.split(" ").length > 1) {
			throw new Error(`Filename "${file.name}" contains whitespace.`);
		}
		const filename = file.name.split("/").pop();
		if (invalid_names.includes(filename)) {
			throw new Error(`Filename "${file.name}" is not allowed.`);
		}
	};

	const isIndexHtml = (file) => {
		if (file.name.split("/").pop() === "index.html") {
			return 1;
		}
		return 0;
	};
	const validateExtensions = (file) => {
		const extension = "." + file.name.split(".").pop();
		if (!valid_extensions.includes(extension) && file.contents !== "") {
			throw new Error(`File extension "${extension}" is not allowed.`);
		}
	};

	const validateSize = (file) => {
		if (file.contents.length > 2 * 1024 * 1024) {
			throw new Error(`File "${file.name}" is too large.`);
		}
	};

	return (
		<form
			className="flex flex-col w-5/6 mx-auto
			mt-10 shadow-md min-h-48 p-4 justify-around bg-flat-700 rounded-xl"
			enctype="multipart/form-data"
			onSubmit={handleSubmit}
		>
			<label
				className="text-xl font-bold text-color-yellow-primary"
				htmlFor="file-upload"
			>
				Select files to upload:
			</label>
			<div
				className="flex flex-row items-center m-auto
						justify-center
						w-full
				 "
			>
				<label
					for="file-upload"
					class={` bg-chili-500 hover:bg-chili-700 text-center cursor-pointer
					  text-color-bg-dark-2  font-bold w-1/4  py-2 px-3 rounded-full
					  ${
							files || loading
								? "-translate-x-1/3 transition-all ease-in-out duration-700"
								: " transition-all ease-in-out duration-700"
						} `}
				>
					Select File
				</label>
				<div
					className={
						files || loading
							? "translate-x-1/3 transition-all ease-in-out duration-700 w-1/4"
							: "opacity-0 "
					}
				>
					{files && !loading ? (
						<p>
							{files.name}{" "}
							<FontAwesomeIcon
								className="ml-2 text-color-green-primary"
								icon={faCheck}
							/>
						</p>
					) : (
						false
					)}
					{loading ? <LoadingWheel /> : false}
				</div>
				<input
					className="hidden"
					type="file"
					id="file-upload"
					name="file-upload"
					onChange={handleFileUpload}
				/>
			</div>

			<label
				className="text-xl font-bold text-color-yellow-primary"
				htmlFor="file-upload"
			>
				Your website's name :
			</label>
			<Input
				onChange={handleChange}
				value={websiteName}
				type="text"
				name="website"
				errors={errors}
				className="Input"
			/>
			{uploading ? (
				uploading !== "done" ? (
					<LoadingWheel />
				) : (
					<p className="self-center">
						Deployment started !
						<FontAwesomeIcon
							className="ml-2 text-color-green-primary fa-2xl "
							icon={faCheck}
						/>
					</p>
				)
			) : (
				<Button
					disabled={files || errors ? false : true}
					type="submit"
					title="Upload Files"
				/>
			)}
		</form>
	);
}

export default UploadWebsiteForm;
