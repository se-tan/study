from django import forms
from django.forms.widgets import Textarea
from django.utils.html import strip_tags
from .models import Message, Friend, Group, Good
from django.contrib.auth.models import User


class MessageForm(forms.ModelForm):  # 未使用
    class Meta:
        model = Message
        fields = ['owner', 'group', 'content']


class GroupForm(forms.ModelForm):  # 未使用
    class Meta:
        model = Group
        fields = ['owner', 'title']


class FriendForm(forms.ModelForm):  # 未使用
    class Meta:
        model = Friend
        fields = ['owner', 'user', 'group']


class GoodForm(forms.ModelForm):  # 未使用
    class Meta:
        model = Good
        fields = ['owner', 'message']


class GroupCheckForm(forms.Form):   # Groupのチェックボックスフォーム
    def __init__(self, user, *args, **kwargs):
        super(GroupCheckForm, self).__init__(*args, **kwargs)

        # publicのUserを取得する(検索の一番最初のみ取得)
        public = User.objects.filter(username='public').first()

        # インスタンスのgroupsフィールドをここで設定することで、
        # クラスにgroups変数を用意したのと同様になる
        # ※ダイナミックに項目を生成できる
        self.fields['groups'] = forms.MultipleChoiceField(

            # for文でリストの項目を生成
            choices=[(item.title, item.title) for item in
                     Group.objects.filter(owner__in=[user, public])],
            widget=forms.CheckboxSelectMultiple(),
        )


class GroupSelectForm(forms.Form):
    def __init__(self, user, *args, **kwargs):
        super(GroupSelectForm, self).__init__(*args, **kwargs)

        # プルダウンメニューを作成
        self.fields['groups'] = forms.ChoiceField(
            choices=[('-', '-')] + [(item.title, item.title)
                                    for item in Group.objects.filter(owner=user)],
            widget=forms.Select(attrs={'class': 'form-control'}),
        )


class FriendsForm(forms.Form):
    def __init__(self, user, friends=[], vals=[], *args, **kwargs):
        super(FriendsForm, self).__init__(*args, **kwargs)
        self.fields['friends'] = forms.MultipleChoiceField(
            choices=[(item.user, item.user) for item in friends],
            widget=forms.CheckboxSelectMultiple(),
            initial=vals
        )


class CreateGroupForm(forms.Form):
    group_name = forms.CharField(max_length=50,
                                 widget=forms.TextInput(attrs={'class': 'form-control'}))


class PostForm(forms.Form):
    content = forms.CharField(max_length=500,
                              widget=forms.Textarea(attrs={'class': 'form-control', 'rows': 2}))

    def __init__(self, user, *args, **kwargs):
        super(PostForm, self).__init__(*args, **kwargs)
        public = User.objects.filter(username='public').first()
        self.fields['groups'] = forms.CharField(
            choices=[('-', '-')]+[(item.title, item.title)
                                  for item in Group.objects.filter(owner__in=[user, public])],
            widget=forms.Select(attrs={'class': 'form-control'}),
        )
