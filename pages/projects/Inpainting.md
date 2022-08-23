---
layout: page
title: "Image Inpainting Techniques for Cultural Heritage Preservation and Ancient Image Restoration"
subheadline: no
permalink: "/projects/inpainting/"
header: no
show_meta: True
categories:
    - project
tags: 
    - U-Nets
    - Computer Vision
    - Generative Networks

---
<b>Under the supervision of: </b> Dr. Dhiraj Sangwan, Principal Scientist, CSIR-CEERI Pilani.

This project was done as a part of my Summer Research Internship at [CSIR-CEERI Pilani](https://www.ceeri.res.in/).

<b><emp><u>Abstract</u></emp></b>: Ancient Mural Images, Cave Painting and other ancient images form the Cultural Heritage of a country. However, natural factors such as dust, humidity, mould, etc. damage these and hence endanger the cultural heritage. A country has to spend considerable amount of funds to preserve and restore them physically. As a result, many countries are now trying to create a digital archive of these images. They are also trying to restore these images digitally. Inpainting is a crucial method of Ancient Image Restoration. Partial Convolutional U-Net is one such deep learning model which is used for Inpainting!

<b><emp><u>Description</u></emp></b>:  I was tasked to create a dataset, do literature review, find a suitable model for our task and to test it out. 
* <emp> What is a PConv U-Net</emp> U-Nets have proven their mettle in the semantic segmentation domain. The PConv U-Net is the adaptation of U-Nets for Inpainting. The Convolutional Layers in the encoding half of the U-Net are replaced with the Partial Convolutional Layers. It has masks and images as the inputs. The PConv Layer learns features from everything but the masked regions. When upsampling, the model regenerates the masked regions and hence carries out Inpainting. When used in ancient image restoration, the masked regions are the deteriorated regions in the image and the PConv U-Net hence restores the images by inpainting in these deteriorated regions.

<div class = "row">
<div class ="small-5 large-5 column">
    <figure>
        <img src="/images/projects/Inpainting/Model.jpg" style="width:100%" class="fig">
        <figcaption>The Model and the workflow</figcaption>
    </figure>   
</div>
<div class ="small-5 large-5 column">
    <figure>
        <img src="/images/projects/Inpainting/Arch.jpg" style="width:100%" class="fig">
        <figcaption>The PConv U-Net Architecture</figcaption>
    </figure>   
</div>
</div>
<div class="row">
<div class ="small-5 large-5 column">
    <figure>
        <img src="/images/projects/Inpainting/pconv.jpg" style="width:100%" class="fig">
        <figcaption>The Partial Convolutional Layer Equation</figcaption>
    </figure>   
</div>
<div class ="small-5 large-5 column">
    <figure>
        <img src="/images/projects/Inpainting/results.jpg" style="width:100%" class="figbig">
        <figcaption>A few of our Results</figcaption>
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