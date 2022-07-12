from django.db import models
from django.contrib.auth.models import User


class Message(models.Model):    # Messageクラス
    owner = models.ForeignKey(User, on_delete=models.CASCADE,
                              related_name='message_owner')
    group = models.ForeignKey('Group', on_delete=models.CASCADE)
    content = models.TextField(max_length=1000)
    good_count = models.IntegerField(default=0)
    share_count = models.IntegerField(default=0)
    pub_date = models.DateTimeField(auto_now_add=True)
    # share_idはシェアされない場合を考慮してIntegerField
    share_id = models.IntegerField(default=-1)

    def __str__(self):
        return str(self.content) + '(' + str(self.owner) + ')'

    # シェア元のメッセージを取得して返す
    def get_share(self):
        return Message.objects.get(id=self.share_id)

    # 新しい順で並び替え
    class Meta:
        ordering = ('-pub_date',)


class Group(models.Model):  # Groupクラス
    owner = models.ForeignKey(User, on_delete=models.CASCADE,
                              related_name='group_owner')
    title = models.CharField(max_length=100)

    def __str__(self):
        return '<' + self.title + '(' + str(self.owner) + ')>'


class Friend(models.Model):  # Friendクラス
    owner = models.ForeignKey(User, on_delete=models.CASCADE,
                              related_name='friend_owner')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    group = models.ForeignKey(Group, models.CASCADE)

    def __str__(self):
        return str(self.user) + '(group:"' + str(self.group) + '")'


class Good(models.Model):   # Goodクラス
    owner = models.ForeignKey(User, on_delete=models.CASCADE,
                              related_name='good_owner')
    message = models.ForeignKey(Message, on_delete=models.CASCADE)

    def __str__(self):
        return 'good for "' + str(self.message) + '" (by ' + \
            str(self.owner) + ')'
