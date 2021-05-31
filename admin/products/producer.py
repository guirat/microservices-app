import pika, json

params = pika.URLParameters('amqps://mxudpzkw:c53WI0AwW4kRJ_WDx3oZi2VOMVQnNBnJ@rat.rmq2.cloudamqp.com/mxudpzkw')

connection = pika.BlockingConnection(params)

channel = connection.channel()


def publish(method, body):
    properties = pika.BasicProperties(method)
    channel.basic_publish(exchange='', routing_key='main', body=json.dumps(body), properties=properties)