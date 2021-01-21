# DM2TELEGRAF

This service collect product stocks of different products for different dm stores around Bruchsal / Karlsruhe and return them in a pretty JSON format.

## Find new product IDs

You can use the following web-service to search for products:
- https://products.dm.de/product/de/search?q=$searchterm&hideFacets=false&hideSorts=false&pageSize=9999

Replace $searchterm with a product name you like to search for.

The returned JSON contains items. The attribute "dan" contains the necessary product ID