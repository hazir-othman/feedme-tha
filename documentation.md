🚀 Running the App (Dev & Production)

This project uses Docker Compose with separate Dockerfiles for development and production environments, providing a consistent environment across all device.

🔧 Start the Dev Environment

docker compose -f docker-compose.dev.yml up --build

🌐 Access the Project in Your Browser

Once the development environment is running, you can access the app from your browser by navigating to:

http://localhost:3000/main

This runs the app on port 3000 by default. Open to console to see useful logs for each actions.

📦 Build & Run for Production

docker compose up --build

🔧 Optimization & Considerations

 - There is no LinkedList by default in js so I build a custom LinkedList in order to track the two different order queue. 
 - In this example I use order id starting with 0001 and can go up to 9999 orders only, if there is more than 9999 orders, we should increase the order id length.
 - we can make a processing screen to show which order is processing by which bot.
 - If we can use pub/sub mechanism such as RabbitMQ we can deploy or undeploy a consumer to be the cooking bot and everytime an order is created, we will publish to the que for the consumers to consume. RabbitMQ will handle how orders are distributed to the cooking bot. Each consumer will also process another order immediately after they are done with an order and they are actively checking for new pending order when there are no pending orders.
 