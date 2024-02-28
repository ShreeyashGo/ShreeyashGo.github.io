---
layout: page
title: "AI for Public Spaces"
subheadline: no
permalink: "/projects/ai4public/"
header: no
show_meta: True
categories:
    - project
tags: 
    - Fairness in ML
    - Learning to Rank
    - Computer Vision
noindex: true
---

This project was done as under the supervision of Prof. Shin Koseki, as a part of my MITACS Globalink Research Internship at the Université de Montréal.

<b><emp><u>Abstract</u></emp></b>: Most commonplace products are generally created by a particular group of learned individuals, and the users play only a small role in the design, ideation and execution of the product. A similar workflow was observed with the development of Public Spaces, where learned urban planners designed and created urban places that the people used. This workflow is now slowly transforming into a more collaborative workflow where the users and other stakeholders are directly involved in the imagination and design of the Public Spaces. However, the collaborative design process is tedious and takes a long duration if the Public Space is to be used by many people. Additionally, there is a risk of inculcating a representation bias while choosing the population for collaborative designing. To solve this problem, we propose an AI solution where we use Computer Vision Algorithms to rank Public Spaces as per multiple Public Perception criteria. We created a dataset of Streetview images of the Montreal Metropolitan Area, with care to attenuate Representation bias by including people from different age groups, genders, sexualities and ethnicities. We also created a Computer Vision Algorithm to rank these street view images according to various criteria that were decided after an extensive literature review and multiple discussions with the participants. 

<div class = "row">
<div class ="small-12 large-12 column">
    <figure>
        <img src="/images/projects/ai4public/cover.jpg" style="width:50%" class="figbig">
        <figcaption>An Example of one datapoint from our Dataset</figcaption>
    </figure>   
</div>
</div>

<div class = "row">
<div class ="small-12 large-12 column">
    <figure>
        <img src="/images/projects/ai4public/results.jpg" style="width:100%" class="figbig">
        <figcaption>An Example of results for the class "Inviting/Welcoming" where the topmost row are the highest ranked images, second row is the lowest ranked images and the third row is a spectrum from the lowest to the highest ranked images</figcaption>
    </figure>   
</div>

</div>


<style>
    .fig:hover{
        transform: scale(2);
    }
    .figbig:hover{
        transform: scale(1.2);
    }
</style>