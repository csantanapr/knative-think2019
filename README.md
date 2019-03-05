# Knative Think2019

## Setup
Get a standard cluster on IBM Kubernetes Service in https://cloud.ibm.com minimum 3 nodes. 2 vCPU with 16GB RAM each.

Configure the IBM CLI and the IKS plugin
```
ic plugin install ks
```

## Demo 1 - Blue Green Deployment

Get EXTERNAL DOMAIN for example `foo.zone01.containers.appdomain.cloud`
```
ibmcloud ks cluster-get <cluster-name>
```

Edit the Config Map `config-domain` and replace `example.com` with the domain from the previous step.
```
kubectl edit cm config-domain --namespace knative-serving
```

Configure the ingress for to route traffic from the external domain name
```
kubetcl apply -f config-network.yaml
```

Deploy the the services
```
kubectl apply -f blue-green-demo-config.yaml
```

Now you will have 2 routes, each one receiving 50% of the traffic.

You can open a browser or use curl multiple times to see that it hits each route alternating.

https://route-blue-green.default.foo.zone01.containers.appdomain.cloud/

## Demo 2 - Knative Event Source to IBM Functions

Create an IBM Function Web Action
```
ibmcloud fn action update processEvent ibm-function.js --kind nodejs:10 --web true
```
Get the public URL to the Function
```
ibmcloud fn action get processEvent --url
```
Test the function
```
curl <web-action-url>
```

Configure the istio to allow knative-eventing to reach outside the network
```
kubectl apply -f config-network-event-external.yaml
kubectl apply -f config-network-ext.yaml
```


