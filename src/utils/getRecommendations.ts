import type { Property } from "../interfaces/Property";

export function getRecommendations(property: Property, properties: Property[]): Property[] {
  const recommendations: Property[] = [];
  const midPriorityRecommendations: Property[] = [];
  const lowPriorityRecommendations: Property[] = [];

  const minPrice = property.precio * 0.8;
  const maxPrice = property.precio * 1.2;
  const ambientsRange = 1; 
  const metersRange = 20; 
  
  for (let i = 0; i < properties.length; i++) {
    const currentProperty = properties[i];
    if (currentProperty.id === property.id) continue;

    const priceOk = currentProperty.precio >= minPrice && currentProperty.precio <= maxPrice;
    const cityOk = currentProperty.ciudad === property.ciudad;
    const typeOk = currentProperty.tipo === property.tipo;
    const ambientsOk = Math.abs(currentProperty.ambientes - property.ambientes) <= ambientsRange;
    const metersOk = Math.abs(currentProperty.metros_cuadrados - property.metros_cuadrados) <= metersRange;

    if ( cityOk && typeOk && priceOk ) {
      recommendations.push( currentProperty );
      if ( recommendations.length === 2 ) break;
      continue;
    }

    const coincidences =
      ( cityOk     ? 1 : 0 ) +
      ( typeOk     ? 1 : 0 ) +
      ( ambientsOk ? 1 : 0 ) +
      ( metersOk   ? 1 : 0 );

    if ( coincidences >= 2 ) {
      midPriorityRecommendations.push( currentProperty );
    } else {
      lowPriorityRecommendations.push( currentProperty );
    }
  }

  for ( const property of midPriorityRecommendations ) {
    if ( recommendations.length === 2 ) break;
    recommendations.push( property );
  }

  for ( const property of lowPriorityRecommendations ) {
    if ( recommendations.length === 2 ) break;
    recommendations.push( property );
  }

  return recommendations;
}
