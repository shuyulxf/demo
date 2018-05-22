#include <unistd.h>  
#include <stdio.h>  
#include <errno.h>  
#include <fcntl.h>  
#include <string.h>  
#include <sys/types.h>  
#include <sys/stat.h>  
#define BUFFER_SIZE 256  
#define CMD_SIZE 10
#define CMD_LEN 50
  
int main(int argc, char *argv[]) {

    // read from file
    int NUMPIPES;
    char cmds[CMD_SIZE][CMD_LEN];
    int CMDCount = 0; 
    
	FILE *fp = NULL;
    fp = fopen("./cmds.txt", "r");
    
	if (fp == NULL){
		perror ("Error opening file");
	}  
	else {
		char cmd[CMD_LEN];
		while (fgets(cmd, CMD_LEN, fp) != NULL) {
			cmds[CMDCount++] = cmd;
		}
       
            
        fclose (fp);
    }
    

//    char *bBuffer, *sPtr, *aPtr = NULL, *pipeComms[NUMPIPES], *cmdArgs[10];
//    int fdPipe[2], fdPipe2[2], pCount, aCount, i, status, lPids[NUMPIPES];
//    pid_t pid;
//
//    pipe(fdPipe);
//
//    while(1) {
//        bBuffer = readline("Shell> ");
//
//        aCount = -1;
//
//        if (i + 1 < pCount)
//            pipe(fdPipe2);
//
//        do {
//            aPtr = strsep(&pipeComms[i], " ");
//
//
//            if(pid == 0) {
//                if(i == 0) {
//                    close(fdPipe[0]);
//                if(i + 1 < pCount) {
//                    close(fdPipe2[0]);
//
//                    dup2(fdPipe[1], STDOUT_FILENO);
//                    dup2(fdPipe2[1], STDOUT_FILENO);
//
//                    close(fdPipe[1]);
//                } else if(i == 1) {
//                    close(fdPipe2[1]);
//                }
//                if(i != 0) {
//                    close(fdPipe[1]);
//            }
//        }
//
//        if (i != 0) {
//            close(fdPipe[0]);
//            close(fdPipe[1]);
//        }
//
//        fdPipe[0] = fdPipe2[0];
//        fdPipe[1] = fdPipe2[1];
//    }
//
//    if (pCount > 0) {
//        close(fdPipe[0]);
//        close(fdPipe[1]);
//    }
	return 0;
}
