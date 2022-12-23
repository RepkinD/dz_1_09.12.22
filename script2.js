// const CONFIG_API = {
//     url: 'https://cats.petiteweb.dev/api/single/RepkinD',
//     headers: {
//         'Content-type': 'application/json',
//     },
// };

// class Api {
//     constructor(config) {
//         this._url = config.url;
//         this._headers = config._headers;
//         // console.log('this is Api constructor');
//     }
//     getAllCats() {
//         fetch(`${this._url}/show`, {
//             method: 'GET',
//         });
//     }
//     addNewCat() {
//         fetch(`${this._url}/add`, {
//             method: 'POST',
//             body: JSON.stringify(data),
//             headers: this._headers,

//         });
//     }
//     updataCatById(data, idCat) {
//         console.log({ data });
//         fetch(`${this._url}/updata/${idCat}`, {
//             method: 'PUT',
//             body: JSON.stringify(data),
//             headers: this._headers,
//         });
//     }
//     deleteCatById(idCat) {
//         fetch(`${this._url}/delete/${idCat}`, {
//             method: 'DELETE',
//         });
//     }
//     getCatById(idCat) {
//         fetch(`${this._url}/show/${idCat}`, {
//             method: 'GET',
//         });
//     }
// }

// const api = new Api(CONFIG_API);

// console.log(api);

// api.getAllCats();
// api.addNewCat({ id: '?', name: '?' });
// api.updataCatById({ name: '?' }, 'id?');
// api.deleteCatById('id?');
// api.getCatById('id?');




const $wr = document.querySelector('[data-wr]')


const getCatHTML = (cat) => {
	return `
		<div class="card mb-2" style="width: 18rem">
		<img src="${cat.image}" class="card-img-top" alt="${cat.name}" />
		<div class="card-body">
			<h5 class="card-title">${cat.name}</h5>
			<p class="card-text">
				${cat.description}
			</p>
		</div>
	</div>
	`
}

fetch('https://cats.petiteweb.dev/api/single/RepkinD/show')
    .then((res) => res.json())
    .then((data) => {

        $wr.insertAdjacentHTML('afterbegin', data.map(cat => getCatHTML(cat)).join(''))

        console.log({ data })


    })