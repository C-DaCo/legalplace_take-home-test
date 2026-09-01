# Solution

## Approche

J'ai commencé par ajouter un test Golden Master pour capturer le comportement 
exact du code existant avant d'y toucher. Ce filet de sécurité m'a permis 
de refactoriser en toute confiance.

J'ai ensuite suivi une approche TDD : écriture des tests unitaires couvrant 
tous les comportements existants et les cas limites avant de refactoriser, 
puis ajout des tests pour Dafalgan avant de l'implémenter.

Une fois tous les tests au vert et le Golden Master confirmant zéro régression, 
j'ai supprimé le snapshot, les tests unitaires servent désormais de 
documentation vivante.

## Architecture

J'ai utilisé le **pattern Strategy** avec une `DrugFactory` :

- Chaque médicament a sa propre classe stratégie avec une méthode `update()`
- `NormalDrug` est la classe de base, elle encapsule les règles communes :
  - `expiresIn` diminue de 1 chaque jour
  - `setBenefit()` centralise la règle 0-50 pour tous les médicaments
- Les médicaments spécifiques n'overrident que ce qui les différencie (`updateBenefit()`)
- Ajouter un nouveau médicament = une nouvelle classe + une ligne dans la factory

## Ce que j'aurais fait avec plus de temps

- Migration en TypeScript pour un typage bout en bout
- Tests d'intégration sur la simulation complète de 30 jours par médicament
- Gestion explicite des noms de médicaments inconnus