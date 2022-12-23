const FIELD_PARAMS = ['id', 'name', 'age', 'rate', 'description', 'favorite', 'image'];
const $cards = document.querySelector('#cards');

function createCard(params) {
    let div = document.createElement('div');
    div.className = 'card';
    div.style.width = '300px';
    div.dataset.id = params.id;

    div.insertAdjacentHTML('afterbegin',
        `<img src="${params.image}"
        class="card-img-top" alt="...">
    <div class="card-body">
        <h5 class="card-title">
            <span data-prop="name">${params.name}</span>
            ${params.favorite ? '<i class="fas fa-heart favorite-icon"></i>' : ''}
        </h5>
        <div class="card-text">
            <ul class="characteristics">
                <li><b>Возраст: </b><span data-prop="age">${params.age}</span></li>
                <li><b>Описание: </b><span data-prop="description">${params.description}</span></li>
            </ul>
        </div>
        <div class="buttons">
            <button data-action="edit" type="button" class="btn btn-primary">Edit</button>
            <button data-action="delete" type="button" class="btn btn-danger">Delete</button>
        </div>
    </div>`)

    return div;
}

class CatsApi {
    constructor(config) {
        this.baseUrl = config.baseUrl;
        this.headers = config.headers;
    }

    getCats() {
        return fetch(`${this.baseUrl}/show`).then(res => res.json());
    }

    deleteCat(id) {
        fetch(`${this.baseUrl}/delete/${id}`, {
            method: 'DELETE',
        }).then((res) => {
            if (res.status === 200) {
                return document.querySelector('.card').remove();
            }

            alert()
        });
    }

    createCat(data) {
        return fetch(`${this.baseUrl}/add`, {
            method: 'POST',
            body: JSON.stringify(data)
            // headers: this.headers,
        });
    }

    // addNewCat() {
    //         fetch(`${this._url}/add`, {
    //             method: 'POST',
    //             body: JSON.stringify(data),
    //             headers: this._headers,

    //         });
    // }
}

const api = new CatsApi({
    baseUrl: 'https://cats.petiteweb.dev/api/single/RepkinD',
    headers: {}
});

api.getCats().then(data => {
    data.forEach(catData => {
        let column = document.createElement('div');
        column.className = 'col';
        column.appendChild(createCard(catData));
        $cards.appendChild(column);
    });
});

document.body.addEventListener('click', (event) => {
    const target = event.target;
    console.log(event.target)
    if (target.hasAttribute('data-action')) {
        const action = target.getAttribute('data-action');

        switch (action) {
            case 'edit':
                break;
            case 'delete':
                const id = target.closest('.card').dataset.id;
                api.deleteCat(id);
                break;
            case 'create':
                const $modal = document.querySelector('#createModal');
                const $form = $modal.querySelector('form');
                const data = getFormData($form, FIELD_PARAMS);

                api.createCat(data);
                console.dir(getFormData($form, FIELD_PARAMS))
                break;
        }
    }

});

function getFormData(form, fields) {
    const result = {};

    fields.forEach(fieldName => {
        const $field = form.elements.namedItem(fieldName);
        if ($field) {
            if ($field.type === 'checkbox') {
                result[fieldName] = $field.checked;

                return;
            }

            result[fieldName] = $field.value;
        }
    });

    return result;
}