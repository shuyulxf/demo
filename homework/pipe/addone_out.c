#include <stdio.h>  
#include <stdlib.h>  
#include <unistd.h>
#include <string.h>  
#include <errno.h>  
#include <sys/types.h>  
#define BUFFER 255 
int main(int argc, char **argv) {  
	
	int i;
	scanf ("%d", &i);
	i++;
	
	FILE *fp = NULL;
 
    fp = fopen("./addone_out.txt", "w");
    
	if (fp == NULL){
		perror ("Error opening file");
	}  
	else {
        fprintf(fp,"%d", i);     
        fclose (fp);
    }

    
    return 0;
}  
