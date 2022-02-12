-- Dropanje tablica
DROP TABLE karte;
DROP TABLE dvorane;
DROP TABLE gledatelji;
DROP TABLE filmovi;
--DROP TABLE klijenti;

-- Dropanje sequenca
DROP SEQUENCE DVORANE_ID_SEQ; 
DROP SEQUENCE GLEDATELJI_ID_SEQ;
DROP SEQUENCE FILMOVI_ID_SEQ;
DROP SEQUENCE KARTE_ID_SEQ;
--DROP SEQUENCE KLIJENTI_ID_SEQ;

-- Kreiranje Tablica

/*
CREATE TABLE klijenti (
	ID NUMBER(6, 0) NOT NULL,
	ime VARCHAR2(60) NOT NULL,
	prezime VARCHAR2(60) NOT NULL,
	OIB NUMBER(11, 0) UNIQUE NOT NULL,
	email VARCHAR2(60) UNIQUE NOT NULL,
	password VARCHAR2(20) NOT NULL,
	spol NUMBER(1, 0) NOT NULL,
	slika VARCHAR2(255) UNIQUE NULL,
	ovlasti NUMBER(1, 0) NOT NULL,
	constraint KLIJENTI_PK PRIMARY KEY (ID));

CREATE sequence KLIJENTI_ID_SEQ;

CREATE trigger BI_KLIJENTI_ID
  before insert on klijenti
  for each row
begin
  select klijenti_ID_SEQ.nextval into :NEW.ID from dual;
end;
*/


CREATE TABLE dvorane  (
	 ID NUMBER(5, 0) NOT NULL,
	 oznaka VARCHAR2(2) NOT NULL,
	 brojSjedala NUMBER(4, 0) NOT NULL,
	constraint DVORANE_PK PRIMARY KEY ( ID ));

CREATE sequence  DVORANE_ID_SEQ ;

CREATE trigger BI_DVORANE_ID 
  before insert on dvorane 
  for each row
begin
  select DVORANE_ID_SEQ.nextval into :NEW.ID from dual;
end;

/
CREATE TABLE gledatelji  (
	 ID NUMBER(5, 0) NOT NULL,
	 ime VARCHAR2(32) NOT NULL,
	 prezime VARCHAR2(32) NOT NULL,
	constraint GLEDATELJI_PK PRIMARY KEY ( ID ));

CREATE sequence GLEDATELJI_ID_SEQ ;

CREATE trigger BI_GLEDATELJI_ID 
  before insert on gledatelji 
  for each row
begin
  select GLEDATELJI_ID_SEQ.nextval into :NEW.ID from dual;
end;

/
CREATE TABLE filmovi  (
	 ID NUMBER(5, 0) NOT NULL,
	 naziv VARCHAR2(32) NOT NULL,
	 trajanje NUMBER(4, 0) NOT NULL,
	 godinaIzdanja NUMBER(4, 0) NOT NULL,
	 redatelj VARCHAR2(50) NOT NULL,
	constraint FILMOVI_PK PRIMARY KEY ( ID ));

CREATE sequence FILMOVI_ID_SEQ ;

CREATE trigger BI_FILMOVI_ID 
  before insert on filmovi 
  for each row
begin
  select FILMOVI_ID_SEQ.nextval into :NEW.ID from dual;
end;

/
CREATE TABLE karte  (
	 ID NUMBER(5, 0) NOT NULL,
	 gledatelj NUMBER(5, 0) NOT NULL,
	 dvorana NUMBER(5, 0) NOT NULL,
	 film NUMBER(5, 0) NOT NULL,
	 vrijeme VARCHAR2(20) NOT NULL,
	constraint KARTE_PK PRIMARY KEY ( ID ));

CREATE sequence  KARTE_ID_SEQ ;

CREATE trigger BI_KARTE_ID 
  before insert on karte 
  for each row
begin
  select KARTE_ID_SEQ.nextval into :NEW.ID from dual;
end;

/



ALTER TABLE  karte  ADD CONSTRAINT  karte_fk0  FOREIGN KEY ( gledatelj ) REFERENCES  gledatelji ( ID );
ALTER TABLE  karte  ADD CONSTRAINT  karte_fk1  FOREIGN KEY ( dvorana ) REFERENCES  dvorane ( ID );
ALTER TABLE  karte  ADD CONSTRAINT  karte_fk2  FOREIGN KEY ( film ) REFERENCES  filmovi ( ID );


-- insert gledatelji

insert into gledatelji(ime, prezime) values('Marko', 'Maric');
insert into gledatelji(ime, prezime) values('Luka', 'Lukic');
insert into gledatelji(ime, prezime) values('Filip', 'Filipovic');
insert into gledatelji(ime, prezime) values('Marija', 'Ilica');
insert into gledatelji(ime, prezime) values('Janko', 'Port');
insert into gledatelji(ime, prezime) values('Fico', 'Rorko');
insert into gledatelji(ime, prezime) values('Lil', 'Partik');
insert into gledatelji(ime, prezime) values('Lil', 'Mico');
insert into gledatelji(ime, prezime) values('Laura', 'Sherlock');
insert into gledatelji(ime, prezime) values('Ivica', 'Lukas');
insert into gledatelji(ime, prezime) values('Jala', 'Bratac');
insert into gledatelji(ime, prezime) values('Jan', 'Pan');
insert into gledatelji(ime, prezime) values('Ozujko', 'Karlovec');
insert into gledatelji(ime, prezime) values('Cipi', 'Ripi');
insert into gledatelji(ime, prezime) values('Tin', 'Rintin');
insert into gledatelji(ime, prezime) values('MIko', 'Partik');
insert into gledatelji(ime, prezime) values('Jakov', 'Dino');
insert into gledatelji(ime, prezime) values('Lana', 'Pirko');
insert into gledatelji(ime, prezime) values('Isko', 'Lukas');
insert into gledatelji(ime, prezime) values('Petar', 'Bratac');
insert into gledatelji(ime, prezime) values('Jess', 'Horvat');
insert into gledatelji(ime, prezime) values('Zvonko', 'Karlovec');
insert into gledatelji(ime, prezime) values('Ivana', 'Horvat');
insert into gledatelji(ime, prezime) values('Patrik', 'Horvat');

-- insert dvorane

insert into dvorane(oznaka, brojSjedala) values('A1', '30');
insert into dvorane(oznaka, brojSjedala) values('A2', '25');
insert into dvorane(oznaka, brojSjedala) values('A3', '25');
insert into dvorane(oznaka, brojSjedala) values('A5', '20');
insert into dvorane(oznaka, brojSjedala) values('A6', '20');
insert into dvorane(oznaka, brojSjedala) values('B1', '10');
insert into dvorane(oznaka, brojSjedala) values('B2', '10');
insert into dvorane(oznaka, brojSjedala) values('B3', '8');
insert into dvorane(oznaka, brojSjedala) values('B4', '8');
insert into dvorane(oznaka, brojSjedala) values('C1', '90');
insert into dvorane(oznaka, brojSjedala) values('C2', '150');
insert into dvorane(oznaka, brojSjedala) values('C3', '200');

-- instert filmovi

insert into filmovi(naziv, trajanje, godinaizdanja, redatelj) values ('Titanic','195','1997','James Cameron');
insert into filmovi(naziv, trajanje, godinaizdanja, redatelj) values ('Human Centipede','92','2009','Tom Six');
insert into filmovi(naziv, trajanje, godinaizdanja, redatelj) values ('Cars','117','2006','John Lasseter');
insert into filmovi(naziv, trajanje, godinaizdanja, redatelj) values ('Hacksaw Ridge','139','2016','Mel Gibson');
insert into filmovi(naziv, trajanje, godinaizdanja, redatelj) values ('Turbo','96','2013','David Soren');
insert into filmovi(naziv, trajanje, godinaizdanja, redatelj) values ('Shutter Island','139','2010','Martin Scorsese');
insert into filmovi(naziv, trajanje, godinaizdanja, redatelj) values ('Kung Fu Panda','92','2008','John Stevenson');
insert into filmovi(naziv, trajanje, godinaizdanja, redatelj) values ('The Matrix','136','1999','The Wachowskis');
insert into filmovi(naziv, trajanje, godinaizdanja, redatelj) values ('The Matrix 2','138','1999','The Wachowskis');
insert into filmovi(naziv, trajanje, godinaizdanja, redatelj) values ('The Day After Tomorrow','123','2004','Ronald Emmerich');
insert into filmovi(naziv, trajanje, godinaizdanja, redatelj) values ('Train to Busan','118','2016','Yeon Sang-ho');
insert into filmovi(naziv, trajanje, godinaizdanja, redatelj) values ('Parasite','132','2019','Bong Joon-ho');

-- insert karte

insert into karte(gledatelj, dvorana, film, vrijeme) values ('1', '1', '1', 'Ponedjeljak 20.');
insert into karte(gledatelj, dvorana, film, vrijeme) values ('19', '1', '1', 'Ponedjeljak 20.');
insert into karte(gledatelj, dvorana, film, vrijeme) values ('2', '1', '1', 'Ponedjeljak 20.');
insert into karte(gledatelj, dvorana, film, vrijeme) values ('10', '1', '1', 'Ponedjeljak 20.');
insert into karte(gledatelj, dvorana, film, vrijeme) values ('9', '1', '1', 'Ponedjeljak 20.');
insert into karte(gledatelj, dvorana, film, vrijeme) values ('8', '1', '1', 'Ponedjeljak 20.');
insert into karte(gledatelj, dvorana, film, vrijeme) values ('7', '3', '3', 'Utorak 21.');
insert into karte(gledatelj, dvorana, film, vrijeme) values ('3', '3', '3', 'Utorak 21.');
insert into karte(gledatelj, dvorana, film, vrijeme) values ('5', '3', '3', 'Utorak 21.');
insert into karte(gledatelj, dvorana, film, vrijeme) values ('16', '2', '6', 'Srijeda 22.');
insert into karte(gledatelj, dvorana, film, vrijeme) values ('3', '2', '6', 'Srijeda 22.');
insert into karte(gledatelj, dvorana, film, vrijeme) values ('10', '2', '6', 'Srijeda 22.');
insert into karte(gledatelj, dvorana, film, vrijeme) values ('5', '2', '6', 'Srijeda 22.');
insert into karte(gledatelj, dvorana, film, vrijeme) values ('6', '8', '9', 'Cetvrtak 23.');
insert into karte(gledatelj, dvorana, film, vrijeme) values ('12', '8', '9', 'Cetvrtak 23.');
insert into karte(gledatelj, dvorana, film, vrijeme) values ('7', '8', '9', 'Cetvrtak 23.');
insert into karte(gledatelj, dvorana, film, vrijeme) values ('5', '8', '9', 'Cetvrtak 23.');
insert into karte(gledatelj, dvorana, film, vrijeme) values ('3', '8', '9', 'Cetvrtak 23.');
insert into karte(gledatelj, dvorana, film, vrijeme) values ('15', '1', '11', 'Petak 24.');
insert into karte(gledatelj, dvorana, film, vrijeme) values ('16', '1', '11', 'Petak 24.');
insert into karte(gledatelj, dvorana, film, vrijeme) values ('12', '1', '11', 'Petak 24.');
insert into karte(gledatelj, dvorana, film, vrijeme) values ('7', '1', '11', 'Petak 24.');
insert into karte(gledatelj, dvorana, film, vrijeme) values ('11', '1', '11', 'Petak 24.');
insert into karte(gledatelj, dvorana, film, vrijeme) values ('13', '1', '11', 'Petak 24.');
insert into karte(gledatelj, dvorana, film, vrijeme) values ('14', '5', '1', 'Subota 25.');
insert into karte(gledatelj, dvorana, film, vrijeme) values ('6', '5', '1', 'Subota 25.');
insert into karte(gledatelj, dvorana, film, vrijeme) values ('5', '5', '1', 'Subota 25.');
insert into karte(gledatelj, dvorana, film, vrijeme) values ('9', '5', '1', 'Subota 25.');
insert into karte(gledatelj, dvorana, film, vrijeme) values ('11', '5', '1', 'Subota 25.');

-- updatovi

update gledatelji set ime = 'Dino', prezime = 'Cici' where id = 1;
update gledatelji set ime = 'Onid', prezime = 'Icic' where id = 2;
update gledatelji set ime = 'Sara', prezime = 'Karku' where id = 12;
update gledatelji set ime = 'Odni' where id = 2;
update dvorane set brojSjedala = 25 where id = 6;
update dvorane set brojSjedala = 5 where id = 5;
update filmovi set naziv = 'The Matrix Reloaded' where id = 9;

-- deleteovi

delete from dvorane where id = 12;
delete from karte where id = 2;
delete from gledatelji where prezime = 'Horvat';
delete from gledatelji where ime = 'Marija';


-- Klasican select za svaku tablicu koja se upotrebljava --

/*
select * from klijenti;
select * from gledatelji;
select * from dvorane;
select * from filmovi;
select * from karte; */


-- Prikaz svih karti s gledateljima koji idu gledat film koji traje vise od 100min --
/*
select
    f.naziv as Film,
    d.oznaka as Dvorana,
    k.id as Karta,
    CONCAT(g.ime, g.prezime) as Gledatelj
from
    karte k
join
    filmovi f
on
    f.ID = k.film
join
    dvorane d
on
    d.ID = k.dvorana
join
    gledatelji g
on
    g.ID = k.gledatelj
where
    trajanje > 100
group by
    k.id, CONCAT(g.ime, g.prezime), d.oznaka, f.naziv;
*/


/*
-- Prikaz svih dvorana s filmovima koji pocinju na slovo T --

select
    f.naziv as Film,
    f.redatelj as Redatelj,
    d.oznaka as Dvorana
from
    karte k
join
    filmovi f
on
    f.ID = k.film
join
    dvorane d
on
    d.ID = k.dvorana
where
    naziv like 'T%'
group by
    d.oznaka, f.naziv, f.redatelj; */

