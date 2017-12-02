export function switchFile(file) {
	return isSpec(file) ? specToCode(file) : codeToSpec(file);
}

function isSpec(file) {
	return file.indexOf('.spec.js') > -1;
}

function codeToSpec(file) {
	file = file.replace('.js', '.spec.js');
	
	return file.replace('/app/', '/spec/');
}

function specToCode(file: string) {
	file = file.replace('.spec.js', '.js');

	return file.replace('/spec/', '/app/');
}

