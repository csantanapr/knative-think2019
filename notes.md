

Get EXTERNAL_IP
```
kubectl get svc istio-ingressgateway --namespace istio-system
```
Get EXTERNAL DOMAIN
```
ibmcloud ks cluster-get knative-cs-tor01
```

Get KN DOMAIN
```
kubectl get ksvc fib-knative --output=custom-columns=NAME:.metadata.name,DOMAIN:.status.domain
```

Call fib
```
curl -X POST -H 'Host: fib-knative.default.example.com' -H 'Content-Type: application/json' ${EXTERNAL_IP}/fib -d '{"number":5}'
```
Call dumper
```
curl -X POST -H 'Host: message-dumper.default.example.com' -H 'Content-Type: application/json' ${EXTERNAL_IP}/fib -d '{"number":5}'
```

Calling from the outside
```bash
curl -X POST http://fib-knative.${NAMESPACE}.${DOMAIN}/fib -H 'Content-Type: application/json' -d '{"number":20}'
```

```bash
curl -X POST http://message-dumper.${NAMESPACE}.${DOMAIN}/fib -H 'Content-Type: application/json' -d '{"number":20}'
```


Cloud Functions Action
```
https://us-south.functions.cloud.ibm.com/api/v1/web/demo/00-knative/processEvents
```

If something not working with ingress edit config map and replace example.com
```
kubectl edit cm config-domain --namespace knative-serving
```




