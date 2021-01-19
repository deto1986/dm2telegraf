const axios = require("axios").default;

/**
 * Generates the list for graph monitoring of certain DM articles
 * @route GET /
 * @param {IncomingMessage} req HTTP request
 * @param {ServerResponse} res HTTP response
 */
exports.getList = (req, res) => {
    // get all stores around BRUCHSAL
    Promise.all([
        axios.get(process.env.DM4TELEGRAF_STORE_LOOKUP_BRUCHSAL),
        axios.get(process.env.DM4TELEGRAF_STORE_LOOKUP_KARLSRUHE)
    ])
        .then(async (result) => {
            var aStores = [];
            for(let r in result) {
                // add each store to result
                for(let s in result[r].data.stores) {
                    // prepare address
                    let oStore = result[r].data.stores[s],
                        sStoreId = oStore.storeNumber,
                        sAddress = oStore.address.street + " / " + oStore.address.zip + " " + oStore.address.city;
                    
                    // fetch stock of product and add store to list
                    let iStockToiletpaper = await getStockOfProducts(sStoreId, process.env.DM4TELEGRAF_URL_PRODUCT_IDS_TOILETPAPER);
                    let iStockMNS = await getStockOfProducts(sStoreId, process.env.DM4TELEGRAF_URL_PRODUCT_IDS_MNS);
                    let iStockFFP2 = await getStockOfProducts(sStoreId, process.env.DM4TELEGRAF_URL_PRODUCT_IDS_FFP2);
                    aStores.push({
                        "id": sStoreId,
                        "street": oStore.address.street,
                        "zip": oStore.address.zip,
                        "city": oStore.address.city,
                        "address": sAddress,
                        "geo_lat": oStore.location.lat,
                        "geo_lon": oStore.location.lon,
                        "stock_toiletpaper": iStockToiletpaper,
                        "stock_mns": iStockMNS,
                        "stock_ffp2": iStockFFP2
                    });
                };
            };
            aStores.sort(compareStoreIds);
            res.send(aStores);
        })
        .then((aStores) => {
            res.send(aStores);
        })
        .catch((error) => {
            console.error(error);
        });    
};

function compareStoreIds(a, b) {
    if(a.id < b.id) {
        return -1;
    }
    if(a.id > b.id) {
        return 1;
    }
    return 0;
}

function getStockOfProducts(sStoreId, sProductIds) {
    return new Promise((resolve, reject) => {
        let iStock = 0,
            url = process.env.DM4TELEGRAF_URL_PRODUCT_STOCK_PER_STORE;
        
        // replace placeholders
        url = url.replace("${product_ids}", sProductIds);
        url = url.replace("${store_ids}", sStoreId);

        // fetch information from service
        axios.get(url).then((resStock) => {
            // sum up stock of toiletpaper
            for (let i in resStock.data.storeAvailabilities) {
                iStock += resStock.data.storeAvailabilities[i][0].stockLevel;
            }

            // end promise
            resolve(iStock);
        })
        .catch((error) => {
            reject(error);
        })
    });
}