# [Click Here to Launch Map](https://aqueum.github.io/UFS-NeighborhoodMap/)
# UFS-NeighborhoodMap
- Udacity Full Stack - Neighborhood Map project
- [Udacity Full Stack Web Developer Nanodegree](
https://www.udacity.com/course/full-stack-web-developer-nanodegree--nd004)
- Martin Currie (Aqueum) - 7 July 2017

# Purpose & design
A web app to help homeless people find somewhere to sleep in Edinburgh.
It is also an assessed project, hence some of the functionality (& certainly the use of KnockoutJS) was dictated by
this [project specification](https://review.udacity.com/#!/rubrics/17/view)

# Getting Started
1. Go to https://aqueum.github.io/UFS-NeighborhoodMap/
2. Hopefully the app will be self explanatory
3. If you don't see a map the chances are there is a google API key issue,
please [contact me](http://www.aqueum.com/contact/)

# Known issues
## Distracting API results
The rubric requires use of a second API.  Other than Twitter (which requires TLS), I couldn't find any public APIs that would generate real value. So I have left it with a wikipedia serarch based on the hostel name.  This may be useful in development mode if the app was expanded to cover hundeds of hostels, but currently seems an irrelevant distraction.

# Files
## index.html
The html file that is served as the initial view, which calls app.js which does most of the heavy lifting

## js/app.js
Predominantly the ViewModel - most of the Knockout middleware.

## js/map.js
Predominantly initMap - the google map middleware

## js/data.js
The hardcoded input data, this would be respaced by a backend database in production.

## js/style.js
The verbose google map styles, created with snazzymaps.

## css/styles.css
the cascading style sheets that make the html a little less ugly.

# Contributing
This is an assessed project, so I'd probably get in trouble for accepting external input.

# Code Status
Can Udacity add a badge here..?

# License
This is an assessed project, but also may be further developed to help a local community interest company,
as such **all rights are reserved**, feel free to [contact me](http://www.aqueum.com/contact/)
if you have any questions.