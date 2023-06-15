import JSZip from "jszip";

const exctractZipFile = async (zippedFiles) => {
	const zip = new JSZip();
	const zipData = await zip.loadAsync(zippedFiles);

	const files = [];

	// Loop through each file in the ZIP file
	// and await for each promise to resolve inside the map callback
	await Promise.all(
		Object.keys(zipData.files).map(async (filename) => {
			const fileData = await zipData.files[filename].async("string");

			files.push({
				name: filename,
				contents: fileData,
			});
		})
	);

	return files;
};

export default exctractZipFile;
