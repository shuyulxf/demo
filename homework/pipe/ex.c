#include <unistd.h>
#include <fcntl.h>
#include <sys/signal.h>
#include <sys/wait.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#define MAX_PARA_NO 128

int main()
{
    int n, pfd[2];
    char buffer[128] = "";
    char *in, *out, *buffer2, *cmd1, *cmd2;
    char *para1[MAX_PARA_NO], *para2[MAX_PARA_NO];

    strcpy(buffer, "grep -v usr < /etc/passwd | wc -l > result.txt");//待处理命令

    signal(SIGCLD, SIG_DFL);//忽略SIGCLD信号，子进程终止后，系统会自动销毁僵尸子进程

    buffer2 = strstr(buffer, "|");//定位管道位置
    in = strstr(buffer, "<"); //定位重定向输入文件位置
    out = strstr(buffer, ">");//定位重定向输出文件位置

    if (in) {
        *in = '\0';
        in = strtok(in + 1, " <>\t\n");//获取输入重定向文件名
    }
    if (out) {
        *out = '\0';
        out = strtok(out + 1, " <>\t\n");//获取输出重定向文件名
    }
    if (! buffer2)
        exit(0);
    else {
        *buffer2 = '\0';
        buffer2++;
    }

    cmd2 = strtok(buffer2, " <>\t\n");//获取第二个命令
    if (! cmd2)
        exit(1);
    //获取第二个命令及选项
    para2[0] = cmd2; 
    for (n = 1; para2[n]; n++) {
        para2[n] = strtok(NULL, " <>\t\n");
    }

    cmd1 = strtok(buffer, " <>\t\n");//获取第一个命令
    if (! cmd1)
        exit(1);
    //获取第一个命令及选项
    para1[0] = cmd1;
    for (n = 1; para1[n]; n++) {
        para1[n] = strtok(NULL, " <>\t\n");
    }

    pipe(pfd);//创建管道

    //子进程一：完成第一个命令待执行
    if (fork() == 0) {
        int fd = -1;

        if (in)
            fd = open(in, O_RDONLY);//以只读方式打开文件
        if (fd != -1)
            dup2(fd,0);//打开的文件作为标准输入
        close(fd);
        dup2(pfd[1], 1);//标准输出写入管道
        close(pfd[1]);
        close(pfd[0]);
        execvp(cmd1, para1);//重新初始化进程，执行第一个命令
        exit(1);
    }

    //子进程二：完成第二个命令待执行
    if (fork() == 0) {
        int fd = -1;

        if (out)
            fd = open(out, O_CREAT | O_WRONLY, 0666);//以创建或只写方式打开文件
        if (fd != -1)
            dup2(fd, 1);//打开的文件作为标准输出
        close(fd);

        dup2(pfd[0], 0);//读出管道中的数据作为标准输入
        close(pfd[1]);
        close(pfd[0]);
        execvp(cmd2, para2);//重新初始化进程，执行第二个命令
        exit(1);
    }
 
    close(pfd[0]);
    close(pfd[1]);

    return 0;
}

