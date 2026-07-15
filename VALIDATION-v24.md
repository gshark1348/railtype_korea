# RAILTYPE KOREA v24 GIS Validation

## Result
- Han River polygon validity: **PASS** (`Valid Geometry`)
- River polygon area in geographic coordinates: `0.008216875` square degrees
- Playable station coordinate combinations checked: **458**
- Stations inside the water polygon: **0**
- Nearest station to water boundary: **청담 / Line 7 / 36.1 m**
- Municipality features checked: **25**
- Topologically valid municipality features: **25 / 25**
- JavaScript route spline default tension: **0.38** (reduced from 0.72 to limit cartographic overshoot)

## Corrected sectors
- **Gangseo / western entry:** Haengju–Banghwa–Gayang–Yeomchang bank direction and width
- **Central Seoul:** Yeouido, Bamseom, Seonyudo, and Nodeulseom as interior land holes
- **Gangdong / eastern exit:** Amsa–Godeok–Guri–Hanam north-eastward bend and channel width

## Boundary policy
The municipal boundary dataset remains the existing topology-preserving SGIS/KOSTAT-derived web geometry because every stored feature is valid. v24 does not claim a cadastral boundary replacement. The river layer is independent and was rebuilt.

## Files
- `data/han-river-geometry-v24.geojson`
- `data/han-river-geometry-v24.json`
- `data/station-water-validation-v24.json`
- `data/boundary-topology-audit-v24.json`
