# Warehouse MERN

- Node version v16.19.1
- NPM v8.19.3

## API

- Documentation: [OpenAPI](api/api.yaml)
- Install `cd /api` `npm i`
- DB container `docker compose -f docker/docker-compose-database.yml up -d`
- Start `cd /api` `npm run start`

## App

- Install `npm i`
- Backend Container Build `docker compose -f docker/docker-compose-backend.yml build`
- Backend Container `docker compose -f docker/docker-compose-backend.yml up -d`
- Start Dev `npm run dev`
- Build `npm run build`

## Run

- Install API
- Install App
- App Container Build `docker compose -f docker/docker-compose.yml build`
- App Container `docker compose -f docker/docker-compose.yml up -d`

## Resources

- Inventory [Example File](resources/inventory.json)

```
{
   "inventory":[
      {
         "art_id":"1",
         "name":"leg",
         "stock":"12"
      }
   ]
}
```
- Products [Example File](resources/products.json)

```
{
  "products": [
    {
      "name": "Dinning Chair",
      "contain_articles": [
        {
          "art_id": "1",
          "amount_of": "4"
        }
      ]
    }
  ]
}
```
