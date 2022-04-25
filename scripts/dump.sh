#!/bin/bash
# loop
for i in {2008..2022} ; do
    echo "Dumping $i""01"
    curl -s "http://localhost:3000/api/banner/v9/$i""01" -o "banner_$i""01".json    
    echo "Dumping $i""05"
    curl -s "http://localhost:3000/api/banner/v9/$i""05" -o "banner_$i""05".json    
    echo "Dumping $i""09"
    curl -s "http://localhost:3000/api/banner/v9/$i""09" -o "banner_$i""09".json    
done

jq -sr '[.[][]]' banner_*.json > banner_merged.json

quicktype --just-types banner_merged.json -o utils/banner/interface.ts
