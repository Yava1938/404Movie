

const consulta = async (path) => {

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


const banner = document.querySelector('.banner')
const imgBanner = ['../img/banner-joker.jfif',
    '../img/madame-web-banner.jpg',
    '../img/THOR-banner.jpg']

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

btnInicio.addEventListener('click', () => {
    window.location.href = 'index.html';
})

btnContacto.addEventListener('click', () => {
    const contactoSection = document.getElementById('contacto-section');
    contactoSection.scrollIntoView({ behavior: 'smooth' });
});



const params = new URLSearchParams(window.location.search);
const serieId = params.get('id');
const pathEpisodios = `https://api.tvmaze.com/shows/${serieId}/episodes`
const pathSerie = `https://api.tvmaze.com/shows/${serieId}`

const serie = consulta(pathEpisodios).then(({ data }) => {
    if (data.length > 0) {
        for (let index = 0; index < data.length; index++) {
            const contInfo = document.querySelector('.cap__content')
            const newElement = document.createElement('tr')
            newElement.setAttribute('class', 'cap__fila')
            const newElemenImgTd = document.createElement('img')
            const newElementd1 = document.createElement('td')
            const newElementd2 = document.createElement('td')
            const newElementd3 = document.createElement('td')
            const newElementd4 = document.createElement('td')
            newElementd1.setAttribute('class', 'cap__dato')
            newElementd2.setAttribute('class', 'cap__dato')
            newElementd3.setAttribute('class', 'cap__dato')
            newElementd4.setAttribute('class', 'cap__dato')
            newElemenImgTd.setAttribute('class', 'cap__img')
            newElemenImgTd.setAttribute('src', data[index].image.original)
            newElementd2.textContent = data[index].name || 'NA'
            newElementd3.textContent = data[index]?.summary?.replace('<p>', '').replace('</p>', '') || 'NA'
            newElementd4.textContent = data[index]?.rating?.average || 'NA'

            newElementd1.append(newElemenImgTd)
            newElement.append(newElementd1)
            newElement.append(newElementd2)
            newElement.append(newElementd3)
            newElement.append(newElementd4)
            contInfo.append(newElement)
        }
    } else {
        const cp_table = document.querySelector('.cap__table')
        cp_table.remove()
        console.log("cp_table: ", cp_table);
        const content = document.querySelector('.content')
        const msgVacio = document.createElement('article')
        msgVacio.setAttribute('class', 'vacio')
        msgVacio.textContent = 'No hay capitulos registrados'

        content.append(msgVacio)

    }

})


const serieInfo = consulta(pathSerie).then(({ data }) => {
    const infoSerieImg = document.querySelector('.serie__img')


    infoSerieImg.setAttribute('src', data.image.original)

    const infoName = document.querySelector('.var__name')
    infoName.textContent = data?.name || 'NA'
    const infoLeng = document.querySelector('.var__lenguaje')
    infoLeng.textContent = data?.language || 'NA'
    const infoGen = document.querySelector('.var__gen')
    infoGen.textContent = data?.genres.toString() || 'NA'
    const infoStatus = document.querySelector('.var__status')
    infoStatus.textContent = data?.status || 'NA'
    const infoPlatf = document.querySelector('.var__platf')
    infoPlatf.textContent = data?.webChannel?.name || 'NA'

}) 
