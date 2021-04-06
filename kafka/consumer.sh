kafka-console-consumer 
--bootstrap-server kafka:9092 
--from-beginning 
--topic dbserver1.public.transaction 
--property print.key=true 
--property key.separator="-"
