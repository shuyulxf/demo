#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
//#include <wait.h>
#include <readline/readline.h>

#define NUMPIPES 2

int main(int argc, char *argv[]) {
    char *bBuffer, *sPtr, *aPtr = NULL, *pipeComms[NUMPIPES], *cmdArgs[10];
    int fdPipe[2], pCount, aCount, i, status, lPids[NUMPIPES];
    pid_t pid;

    pipe(fdPipe);

    while(1) {
        bBuffer = readline("Shell> ");

        if(!strcasecmp(bBuffer, "exit")) {
            return 0;
        }

        sPtr = bBuffer;
        pCount = -1;

        do {
            aPtr = strsep(&sPtr, "|");
            pipeComms[++pCount] = aPtr;
        } while(aPtr);

        for(i = 0; i < pCount; i++) {
            aCount = -1;

            do {
                aPtr = strsep(&pipeComms[i], " ");
                cmdArgs[++aCount] = aPtr;
            } while(aPtr);

            cmdArgs[aCount] = 0;

            if(strlen(cmdArgs[0]) > 0) {
                pid = fork();

                if(pid == 0) {
                    if(i == 0) {
                        close(fdPipe[0]);

                        dup2(fdPipe[1], STDOUT_FILENO);

                        close(fdPipe[1]);
                    } else if(i == 1) {
                        close(fdPipe[1]);

                        dup2(fdPipe[0], STDIN_FILENO);

                        close(fdPipe[0]);
                    }

                    execvp(cmdArgs[0], cmdArgs);
                    exit(1);
                } else {
                    lPids[i] = pid;

                    /*waitpid(pid, &status, 0);

                    if(WIFEXITED(status)) {
                        printf("[%d] TERMINATED (Status: %d)\n",
                            pid, WEXITSTATUS(status));
                    }*/
                }
            }
        }

        for(i = 0; i < pCount; i++) {
            waitpid(lPids[i], &status, 0);

            if(WIFEXITED(status)) {
                printf("[%d] TERMINATED (Status: %d)\n",
                    lPids[i], WEXITSTATUS(status));
            }
        }
    }

    return 0;
}
