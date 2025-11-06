
export default class App {
	/**
	 * Méthode principale. Sera appelée après le chargement de la page.
	 */
	static main() {
		var app = document.getElementById("app");
		this.chargerJson("fichier.json").then(donnees => {
			console.log(donnees);
		});
	}
	/**
	 * Charge un fichier JSON.
	 * @param {string} url URL du fichier JSON ou de l'API
	 * @returns {Promise} Promise résolue avec le JSON
	 */
	static chargerJson2(url) {
		return fetch(url).then(reponse => {
			if (!reponse.ok) {
				throw new Error(`Erreur HTTP, statut ${reponse.status}`);
			}
			return reponse.json();
		});
	}
}
