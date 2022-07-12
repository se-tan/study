from django import forms
# from django.utils.regex_helper import Choice


class HelloForm(forms.Form):
    name = forms.CharField(label='name',
                           widget=forms.TextInput(attrs={'class': 'form-control'}))
    mail = forms.CharField(label='mail',
                           widget=forms.TextInput(attrs={'class': 'form-control'}))
    age = forms.IntegerField(label='age',
                             widget=forms.NumberInput(attrs={'class': 'form-control'}))
    # check = forms.NullBooleanField(label='Check')
    data = [
        ('one', 'item 1'),
        ('two', 'item 2'),
        ('three', 'item 3'),
        ('four', 'item 4'),
        ('five', 'item 5')
    ]
    # choice = forms.ChoiceField(label='Choice', choices=data)
    # choice = forms.ChoiceField(label='radio', choices=data, widget=forms.RadioSelect())
    choice = forms.ChoiceField(label='radio', choices=data, \
        widget=forms.Select(attrs={'size': 5}))
    # choice = forms.MultipleChoiceField(label='radio', \
    #     choices=data, widget=forms.SelectMultiple(attrs={'size', 5}))