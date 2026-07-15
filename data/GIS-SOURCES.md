# GIS Sources and v24 Method

## Coordinate system
- Runtime map and station data: WGS84 / EPSG:4326
- Metric validation: EPSG:5179

## Reference hierarchy
1. National Geographic Information Institute / VWorld national base-map real-width river and river-boundary layers
2. SGIS municipality topology and annual administrative-boundary guidance
3. S-Map and Smart Seoul Map for visual cross-checks at the Seoul–Goyang/Gimpo and Seoul–Guri/Hanam seams
4. Seoul Metro and Korea Rail Network Authority/open railway datasets for official station coordinates

## v24 implementation
The previous river was a sparse hand-drawn ribbon embedded in `app.js`. v24 moves the geometry to a standalone multi-ring dataset and increases control-point density at the western and eastern approaches. Islands are represented as holes. The result is designed for a minimalist SVG infographic and is not a cadastral, hydrographic, or legal survey product.

Municipal geometry was not arbitrarily redrawn. All 25 stored features passed topology validity checks and were retained; the separate river layer was the primary source of the visible mismatch.
