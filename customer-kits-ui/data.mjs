import { readFile } from 'node:fs/promises';
export const money = value => Number(value.replace(/[^0-9.]/g, ''));
export function parseResearch(markdown) {
  const text = markdown.replace(/\r/g, '');
  const blocks = text.split(/^## /m).slice(1).map(block => {
    const split = block.indexOf('\n');
    return { title: block.slice(0, split), content: block.slice(split + 1).trim() };
  });
  const rows = content => content.split('\n').filter(line => line.startsWith('|')).map(line => line.split('|').slice(1,-1).map(cell => cell.trim())).filter(row => !row.every(cell => /^:?-+:?$/.test(cell)));
  const quick = rows(blocks[0].content).slice(1);
  const kits = quick.map(row => ({id:row[0],name:row[1],use:row[2],cost:money(row[3]),category:row[0].startsWith('CAM')?'Cameras':row[0].startsWith('ACC')?'Access control':row[0].startsWith('INT')?'Integration':'Networking',parts:[],notes:''}));
  for (const block of blocks.slice(2,5)) {
    for (const detail of block.content.split(/^#### /m).slice(1)) {
      const kit = kits.find(kit => detail.startsWith(kit.id + ' '));
      if (!kit) continue;
      kit.parts = rows(detail).slice(1).map(row => ({qty:Number(row[0]),name:row[1],sku:row[2],unit:money(row[3]),total:money(row[4])}));
      kit.notes = detail.slice(detail.indexOf('**Hardware total:')).replace(/\n---\s*$/, '').trim();
    }
  }
  const apParts = {
    'AP-A':[[1,'U7 Pro','U7-Pro-US',208],[1,'PoE+ injector (30 W)','U-PoE+',15]],
    'AP-B':[[1,'U7 Pro Outdoor','U7-Pro-Outdoor-US',307],[1,'PoE+ injector (30 W)','U-PoE+',15]],
    'AP-C':[[1,'Cloud Gateway Ultra','UCG-Ultra',142],[1,'Lite 8 PoE switch','USW-Lite-8-PoE',120],[2,'U7 Pro','U7-Pro-US',208]],
    'AP-D':[[1,'Cloud Gateway Ultra','UCG-Ultra',142],[1,'Ultra 210W switch','USW-Ultra-210W',219],[4,'U7 Pro','U7-Pro-US',208]]
  };
  for (const kit of kits.filter(kit=>kit.category==='Networking')) {
    kit.parts=apParts[kit.id].map(([qty,name,sku,unit])=>({qty,name,sku,unit,total:qty*unit}));
    kit.notes=kit.id==='AP-A'||kit.id==='AP-B'?'Requires an existing UniFi Network host. Includes a PoE+ injector.':'Includes a separate UniFi Network host. Cloud Gateway Ultra runs Network only; it cannot host Protect or Access.';
  }
  const addonSections = blocks[5].content.split(/^### /m).slice(1).map(detail => {
    const split=detail.indexOf('\n');
    return {title:detail.slice(0,split),content:detail.slice(split+1).trim()};
  });
  const addons = addonSections.slice(0,4).flatMap((section,index) => {
    const tables = section.content.split(/\n\s*\n/).filter(part=>part.trim().startsWith('|'));
    const table = tables[index===0?1:0];
    return rows(table).slice(1).map((row,i)=>({id:'addon-'+index+'-'+i,name:row[0],sku:row[1],cost:money(row[2]),note:row[3]||'',category:['Networking','Cameras & recording','Access control','AV & alerts'][index]}));
  });
  return {title:text.split('\n')[0].replace(/^# /,''),snapshot:'2026-10-02',kits,addons,blocks,addonSections,markdown:text};
}
export async function loadResearch() {
  return parseResearch(await readFile(new URL('../research/customer-kits.md',import.meta.url),'utf8'));
}
