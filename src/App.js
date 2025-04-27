
export default class App {
	/**
	 * Méthode principale. Sera appelée après le chargement de la page.
	 */
	static main() {
		var site = "https://www.dnd5eapi.co";
		this.chargerJson(site + "/api/classes/paladin").then(classe => {
			console.log(`La classe s'appelle ${classe.name}`);
			var subclasses = classe.subclasses;
			return subclasses.map(subclasse => {
				return subclasse.url;
			});
		}).then(urls => {
			var promesses = urls.map(url => {
				return this.chargerJson(site + url);
			});
			return Promise.all(promesses);
		}).then((sousClasses) => {
			sousClasses.forEach(sousClasse => {
				console.log(`La sous-classe s'appelle ${sousClasse.name}`);
				console.log(sousClasse.desc.join("\n"));
			});
		});
	}
	static chargerJson(url) {
		return new Promise(resolve => {
			var xhr = new XMLHttpRequest();
			xhr.open("get", url);
			xhr.responseType = "json";
			xhr.addEventListener("load", e => {
				resolve(e.target.response); // Retourne les données
			});
			xhr.send();
		});
	}
	static chargerJson2(url) {
		return fetch(url).then(reponse => {
			if (!reponse.ok) {
				throw new Error(`Erreur HTTP, statut ${reponse.status}`);
			}
			return reponse.json();
		});
	}
}
