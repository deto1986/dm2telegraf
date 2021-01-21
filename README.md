# DM2TELEGRAF

This service collect product stocks of different products for different dm stores around Bruchsal / Karlsruhe and return them in a pretty JSON format.

## Find new product IDs

You can use the following web-service to search for products:
- https://products.dm.de/product/de/search?q=${searchterm}&hideFacets=false&hideSorts=false&pageSize=9999

Replace ${searchterm} with a product name you like to search for.

The returned JSON contains items. The attribute "dan" contains the necessary product ID

## Find store IDs

You can either use the dm-Website to open a specific store ("Weitere Details" link). In the URL you can find the store id (dm.de/store/$country-$store_id/...).

Also you can use the web-service of the map. The map using geo coordinates and returns a list of store ids via JSON.

Example for Karlsruhe with a perimeter 20 km: https://store-data-service.services.dmtech.com/stores/bbox/49.12242304480293%2C7.948253206488602%2C48.92091530210405%2C8.793906256455102

Example for Bruchsal with a perimeter of 20 km: https://store-data-service.services.dmtech.com/stores/bbox/49.186565005019304%2C8.232638793807155%2C49.08604326652855%2C8.655465318790391

## Get stock of product(s)

With web-service https://products.dm.de/store-availability/DE/availability?dans=${product_ids}&storeNumbers=${store_ids} you can request the available stock per store per product id.

You can comma-separate product id's and store id's to request multiple data at once.