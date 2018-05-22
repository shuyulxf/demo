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
	printf("%d", i);
    return 0;
}  
