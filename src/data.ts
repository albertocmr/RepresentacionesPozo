export type Brand = { name: string; sectors: string[] }
export const brands: Brand[] = [
  ...['Grupo Desa','Umacon','Mevasa','Alyco Tools','Enar','Solga Diamant','Texho','Preme','Theca','ITT','SAS Ibérica','Bio Polímeros Maya','Conhersa','Benimeli','Lisanplast'].map(name => ({ name, sectors: ['Construcción'] })),
  ...['Airum','Cemvisa','Röntgen','Cables y Eslingas','Hilaturas Perio','Interdix','Zarges','Euritecsa','Teicocil','Varosa'].map(name => ({ name, sectors: ['Industria y ferretería'] })),
  ...['Cofra','Metálicas Julio García','JSP','Soler Hispania'].map(name => ({ name, sectors: ['Seguridad laboral'] })),
]
export const sectors = [
  { title: 'Construcción', path: '/sectores/construccion', number: '01', text: 'Equipamiento, maquinaria y soluciones para profesionales de la construcción.', image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=85' },
  { title: 'Industria y ferretería', path: '/sectores/industria-ferreteria', number: '02', text: 'Suministros y herramientas para distribuidores, talleres y entornos industriales.', image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1200&q=85' },
  { title: 'Seguridad laboral', path: '/sectores/seguridad-laboral', number: '03', text: 'Protección, vestuario laboral y soluciones de señalización y seguridad.', image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?auto=format&fit=crop&w=1200&q=85' },
]
export const contact = {
  address: 'Calle Alejandro Dumas, 19, 29004 Málaga',
  phones: ['952 330 004', '650 768 902'],
  emails: ['info@representacionespozo.com', 'info@reprepozo.com'],
  hours: 'Lunes a viernes · 08:30–13:30 y 15:30–18:30',
}