# Autocomplete.bin

Make use of Frankiz's LDAP to autocomplete email adresses and other info

# Installation

### Setup the virtualenv

```
python3 -m virtualenv venv
source venv/bin/activate
pip install -r requirements.txt
```

### Setup the database

```
./manage.py migrate
./manage.py createsuperuser
```

## Usage

```
./manage.py runserver
```
