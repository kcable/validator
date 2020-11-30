curl -X POST \
     -F token=afa7eb0c2a134c7d4e582f4767b201 \
     -F ref=pipelines \
     -F "variables[TEST_VARIABLE]='worked'" \	
     https://gitlab.com/api/v4/projects/22769416/trigger/pipeline
