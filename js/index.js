const consultarInfo = async (path) => {
    const url = {
        method: 'GET',
        url: path
    }
    return new Promise(async (resolve, reject) => {
        try {
            const respuesta = await axios(url).then((res) => {
                return res;
            }).catch((err) => {
                return err
            })
            return respuesta ? resolve(respuesta) : reject(respuesta)

        } catch (error) {
            console.log("error: ", error);
        }
    })

}
const chicos = 'https://api.tvmaze.com/search/shows?q=boys'
const chicas = 'https://api.tvmaze.com/search/shows?q=girls'

const crearElementos = (listado, clase) => {
    if (listado.data.length > 0) {
        const classMain = document.querySelector(`.${clase}`);
        listado.data.forEach(item => {
            const newElement = document.createElement('article');
            newElement.setAttribute('class', 'item');
            newElement.setAttribute('id', item.show.id);

            const newElemenImg = document.createElement('img');
            newElemenImg.setAttribute('class', 'item__img');
            newElemenImg.setAttribute('src', item.show.image.original);

            const newElemenName = document.createElement('h3');
            newElemenName.setAttribute('class', 'item_name');
            newElemenName.textContent = item.show.name;

            newElement.append(newElemenImg, newElemenName);
            newElement.addEventListener('click', () => {
                window.location.href = `serie.html?id=${newElement.id}`;
                verSerieId();
            });

            classMain?.append(newElement);
        });
    }
};

consultarInfo(chicos).then(listado => crearElementos(listado, 'chicos'));
consultarInfo(chicas).then(listado => crearElementos(listado, 'chicas'));


const banner = document.querySelector('.banner')
const imgBanner = ['../img/banner-joker.jfif',
    '../img/madame-web-banner.jpg',
    '../img/THOR-banner.jpg', '../img/Banner3.jpg']

let currentImg = 0;
const changeBanner = () => {
    const nextImg = (currentImg + 1) % imgBanner.length
    const newImg = imgBanner[nextImg]

    const overlay = document.createElement('div')
    overlay.style.backgroundImage = `url(${newImg})`;
    overlay.classList.add('overlay');

    banner.appendChild(overlay);

    setTimeout(() => {
        overlay.style.opacity = 1;
    }, 10);

    setTimeout(() => {
        banner.style.backgroundImage = `url(${newImg})`;
        banner.removeChild(overlay);
    }, 510);
    currentImg = nextImg;


}
banner.style.backgroundImage = `url(${imgBanner[currentImg]})`

changeBanner();
setInterval(changeBanner, 5000);

const ctgBtn = document.querySelector('.categories__list')
const btnInicio = ctgBtn.firstElementChild
const btnContacto = ctgBtn.lastElementChild
console.log("btnInicio: ", btnInicio);

btnInicio.addEventListener('click', () => {
    window.location.href = 'index.html';
})
btnContacto.addEventListener('click', () => {
    const contactoSection = document.getElementById('contacto-section');
    contactoSection.scrollIntoView({ behavior: 'smooth' });
});


