import JSZip from "jszip";

const exctractZipFile = async (zippedFiles) => {
	const file = zippedFiles;
	console.log(file);
	const reader = new FileReader();

	// Read the file as a Blob
	reader.readAsArrayBuffer(file);

	// Wait for the file to be loaded as a Blob
	await new Promise((resolve, reject) => {
		reader.onload = () => resolve();
		reader.onerror = () => reject(new Error("Failed to read file"));
	});

	// Load the zip file as a Blob using JSZip
	const zip = new JSZip();
	const zipData = await zip.loadAsync(reader.result);

	const files = [];

	// Loop through each file in the ZIP file
	await Promise.all(
		Object.keys(zipData.files).map(async (filename) => {
			// Get the contents of the file
			const contents = await zipData.files[filename].async("string");

			// Add the file object to the files array
			files.push({
				name: filename,
				contents: contents,
			});
		})
	);

	console.log(files);
	return files;
};

export default exctractZipFile;
