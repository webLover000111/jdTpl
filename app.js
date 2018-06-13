const fs = require('fs');
/* const tempArgvs = process.argv[2];
const argvs = tempArgvs.split(','); */
const argvs = [{mapId: '1',areaNum: 2,areaItems: [{ alt: '11', title: '2222', href: '1231', coords: '231 23 21 321', newTab: false}, { alt: '11', title: '2222', href: '1231', coords: '231 23 21 321', newTab: false}],priceNum: 1,priceItem: [{skuId: 123, fontSize:1323, color:'#qweqw', top: 123, left:123}]}, {mapId: '2',areaNum: 2,areaItems: [{ alt: '11', title: '2222', href: '1231', coords: '231 23 21 321', newTab: false}, { alt: '11', title: '2222', href: '1231', coords: '231 23 21 321', newTab: false}],priceNum: 1,priceItem: [{skuId: 123, fontSize:1323, color:'#qweqw', top: 123, left:123}]}]
if (argvs.length <= 0) {
  console.log('没有输入参数！');
  return ;
} else {
  if (Array.isArray(argvs)) {
    const mapList = [];
    for (let i =0; i < argvs.length; i++) {
      const { mapId, areaNum, areaItems, priceNum, priceItem } = argvs[i];
      const areaTpl = [];
      const spanTpl = [];
      if (areaNum > 0) {
        for (let j = 0; j < areaNum; j++) {
          const { alt, title, href, coords, newTab } = argvs[i].areaItems[j];
          if (href && coords ) {
            let target = '_blank';
            if (!newTab) {
              target = '';
            }
            const areaItem = `<area alt="${alt}" title="${title}" href="${href}" target="${target}" shape="rect" coords="${coords}" />`;
            areaTpl.push(areaItem);
          } else {
            console.log('输入参数出错');
            return;
          }
        }
        if (priceNum > 0) {
          for (let j = 0; j < priceNum; j++) {
            const { skuId, fontSize, color, top, left } = argvs[i].priceItem[j];
            if (skuId) {
              const spanItem = `<span jdprice="${skuId}" class="jdNum" jshop="price" style="position:absolute;font-size:${fontSize}px;color:${color};top:${top}px;left:${left}px;"></span>`;
              spanTpl.push(spanItem);
            } else {
              console.log('skuId不能为空');
              return;
            }
          }
        }
        const area = areaTpl.join('\n');
        const span = spanTpl.join('\n');
        const mapTpl = `<div style="position:relative;">
        <img src="" usemap="#Map${mapId}" />
        <map name=${mapId} id=${mapId}>
          ${area}
        </map>
        ${span}
      </div>`;
      mapList.push(mapTpl);
      }
    }
    const map = mapList.join('\n');
    const result = `
    <div>
      ${map}
    </div>
    `;
    console.log(result)
    return result;
  } else {
    console.log('输入参数必须是数组形式');
    return;
  }
}