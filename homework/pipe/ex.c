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

    strcpy(buffer, "grep -v usr < /etc/passwd | wc -l > result.txt");//����������

    signal(SIGCLD, SIG_DFL);//����SIGCLD�źţ��ӽ�����ֹ��ϵͳ���Զ����ٽ�ʬ�ӽ���

    buffer2 = strstr(buffer, "|");//��λ�ܵ�λ��
    in = strstr(buffer, "<"); //��λ�ض��������ļ�λ��
    out = strstr(buffer, ">");//��λ�ض�������ļ�λ��

    if (in) {
        *in = '\0';
        in = strtok(in + 1, " <>\t\n");//��ȡ�����ض����ļ���
    }
    if (out) {
        *out = '\0';
        out = strtok(out + 1, " <>\t\n");//��ȡ����ض����ļ���
    }
    if (! buffer2)
        exit(0);
    else {
        *buffer2 = '\0';
        buffer2++;
    }

    cmd2 = strtok(buffer2, " <>\t\n");//��ȡ�ڶ�������
    if (! cmd2)
        exit(1);
    //��ȡ�ڶ������ѡ��
    para2[0] = cmd2; 
    for (n = 1; para2[n]; n++) {
        para2[n] = strtok(NULL, " <>\t\n");
    }

    cmd1 = strtok(buffer, " <>\t\n");//��ȡ��һ������
    if (! cmd1)
        exit(1);
    //��ȡ��һ�����ѡ��
    para1[0] = cmd1;
    for (n = 1; para1[n]; n++) {
        para1[n] = strtok(NULL, " <>\t\n");
    }

    pipe(pfd);//�����ܵ�

    //�ӽ���һ����ɵ�һ�������ִ��
    if (fork() == 0) {
        int fd = -1;

        if (in)
            fd = open(in, O_RDONLY);//��ֻ����ʽ���ļ�
        if (fd != -1)
            dup2(fd,0);//�򿪵��ļ���Ϊ��׼����
        close(fd);
        dup2(pfd[1], 1);//��׼���д��ܵ�
        close(pfd[1]);
        close(pfd[0]);
        execvp(cmd1, para1);//���³�ʼ�����̣�ִ�е�һ������
        exit(1);
    }

    //�ӽ��̶�����ɵڶ��������ִ��
    if (fork() == 0) {
        int fd = -1;

        if (out)
            fd = open(out, O_CREAT | O_WRONLY, 0666);//�Դ�����ֻд��ʽ���ļ�
        if (fd != -1)
            dup2(fd, 1);//�򿪵��ļ���Ϊ��׼���
        close(fd);

        dup2(pfd[0], 0);//�����ܵ��е�������Ϊ��׼����
        close(pfd[1]);
        close(pfd[0]);
        execvp(cmd2, para2);//���³�ʼ�����̣�ִ�еڶ�������
        exit(1);
    }
 
    close(pfd[0]);
    close(pfd[1]);

    return 0;
}

