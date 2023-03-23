import { useState } from "react";
import { invalid_names, valid_extensions } from "../variables";
import exctractZipFile from "../services/zip.service";
import WebsiteService from "../services/websites.service";
function UploadWebsiteForm() {
	const [files, setFiles] = useState([]);

	const handleFileUpload = async (event) => {
		console.log(event);
		console.log(event.target.files);

		const zipFile = event.target.files[0];
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
				numberOfIndex += isIndexHtml(file);
			}

			// If all files pass validation, update state
			if (numberOfIndex == 1) setFiles(zipFile);
			else
				throw new Error(`The zipfile must one, and only one index.html file`);
		} catch (error) {
			// Handle validation errors
			console.log("Validation error:", error);
		}
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		await WebsiteService.uploadWebsite(files);
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
		console.log(file, "is valid filename");
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
		console.log(extension, "is valid extension");
	};

	const validateSize = (file) => {
		if (file.contents.length > 2 * 1024 * 1024) {
			throw new Error(`File "${file.name}" is too large.`);
		}
		console.log(file.contents.length, "is valid size");
	};

	return (
		<form enctype="multipart/form-data" onSubmit={handleSubmit}>
			<label htmlFor="file-upload">Select files to upload:</label>
			<input
				type="file"
				id="file-upload"
				name="file-upload"
				onChange={handleFileUpload}
			/>
			<button type="submit">Upload Files</button>
		</form>
	);
}

export default UploadWebsiteForm;
