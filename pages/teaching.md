---
layout: page-fullwidth
title: "Teaching"
meta_title: "Teaching | Shreeyash Gowaikar"
meta_description: "Teaching experience at Georgia Tech: Head GTA for Computational Data Analysis and sole GTA for AI for Social Impact, alongside earlier teaching and volunteer tutoring."
subheadline: false
teaser: "Supporting students through thoughtful assignments, practical tutorials, and collaborative learning."
permalink: "/teaching/"
header: false
---

<link rel="stylesheet" href="{{ '/assets/css/teaching.css' | relative_url }}">
{% assign portfolio_page = site.pages | where: 'permalink', '/aboutMe/' | first %}
<section class="teaching-page" aria-label="Teaching experience">
{% for teach in portfolio_page.teaching %}
<article class="teaching-experience{% if teach.role_style %} teaching-experience--{{ teach.role_style }}{% endif %}">
    <span class="teaching-role{% if teach.role_style %} teaching-role--{{ teach.role_style }}{% endif %}">{{ teach.role | escape }}</span>
    <h2>{{ teach.code | escape }} · {{ teach.name | escape }}</h2>
    {% if teach.school %}<p class="teaching-school">{{ teach.school | escape }}</p>{% endif %}
    <p class="teaching-date">{{ teach.dates | escape }}</p>
    <p class="teaching-description">{{ teach.description | escape }}</p>
    {% if teach.course_url %}<a class="teaching-course-link" href="{{ teach.course_url | escape }}">Course homepage <span aria-hidden="true">↗</span></a>{% endif %}
</article>
{% endfor %}
</section>
