const $sitelist = $('.sitelist')
const $lastlist = $sitelist.find('li.last')
const x = localStorage.getItem('x')
const xObject = JSON.parse(x)
const hashMap = xObject || [
    { logo: 'Z', url: 'https://www.zhihu.com' },
    { logo: 'G ', url: 'https://github.com' },
    { logo: 'J ', url: 'https://juejin.cn' },
    { logo: 'I ', url: 'https://iconpark.oceanengine.com' },
]
const simplifyUrl = (url) => {
    return url.replace('https://', '')
        .replace('http://', '')
        .replace('www.', '')
        .replace(/\..*/, '')
}//简化url

const render = () => {
    $sitelist.find('li:not(.last)').remove()
    hashMap.forEach((node, index) => {
        const $li = $(`<li>
            <div class="site">
                <div class="logo">${node.logo}</div>
                <div class="link">${simplifyUrl(node.url)}</div>
                <div class="close">
                <svg class="iconpark-icon">
                    <use href="#close-small"></use>
                </svg></div>
            </div>
        </li>`).insertBefore($lastlist)
        $li.on('click', () => {
            window.open(node.url)
        })
        $li.on('click', '.close', (e) => {
            e.stopPropagation() //阻止冒泡
            hashMap.splice(index, 1)
            render()
        })
    });
}

render()

$('.addbutton')
    .on('click', () => {
        let url = window.prompt('请问你要添加的网址是？')
        if (url.indexOf('http') !== 0) {
            url = 'https://' + url
        }
        console.log(url)
        hashMap.push({
            logo: simplifyUrl(url)[0],
            logoType: 'text',
            url: url
        });
        render()
    });

window.onbeforeunload = () => {
    const string = JSON.stringify(hashMap)
    localStorage.setItem('x', string)
}//保存本地

