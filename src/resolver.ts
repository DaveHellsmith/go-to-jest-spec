export function getRelated(file) {
	if (isSpec(file)) {
		return specToCode(file);
	} else {
		return codeToSpec(file);
	}
}

export function isSpec(file) {
	return file.indexOf('.spec.js') > -1;
}

export function codeToSpec(file) {
	file = file.replace('.js', '.spec.js');
	
	return file.replace('/app/', '/spec/');
}

export function specToCode(file: string) {
	file = file.replace('.spec.js', '.js');

	return file.replace('/spec/', '/app/');
}

