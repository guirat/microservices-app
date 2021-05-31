import pika, json, os, django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', "admin.settings")
django.setup()

from products.models import Product

params = pika.URLParameters('amqps://mxudpzkw:c53WI0AwW4kRJ_WDx3oZi2VOMVQnNBnJ@rat.rmq2.cloudamqp.com/mxudpzkw')

connection = pika.BlockingConnection(params)

channel = connection.channel()

channel.queue_declare(queue='admin')

def callback(ch, method, properties, body):
    print('Received in admin')
    id = json.loads(body)
    print(id)
    product = Product.objects.get(id=id)
    product.likes = product.likes + 1
    product.save()
    print('Product has more likes !')

channel.basic_consume(queue='admin', on_message_callback=callback, auto_ack=True)

print('Starting Consuming')

channel.start_consuming()

channel.close()