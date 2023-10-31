
export default class App {
	/**
	 * Méthode principale. Sera appelée après le chargement de la page.
	 */
	static main() {
		var app = document.getElementById("app");
		this.chargerJson("test.json").then(function(json) {
			console.log(json);
		}).catch(function(error) {
			console.error(error);
		});
	}
	static chargerJson(url) {
		return new Promise(function(resolve, reject) {
			var xhr = new XMLHttpRequest();
			xhr.open("GET", url);
			xhr.responseType = "json";
			xhr.addEventListener("load", e => {
				if (xhr.status >= 200 && xhr.status < 300) {
					resolve(xhr.response);
				} else {
					reject({
						status: xhr.status,
						statusText: xhr.statusText
					});
				}
			});
			xhr.addEventListener("error", e => {
				reject({
					status: xhr.status,
					statusText: xhr.statusText
				});
			});
			xhr.send();
		});
	}
}
