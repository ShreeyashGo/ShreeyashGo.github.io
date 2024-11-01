---
layout: page-fullwidth
title:  "Publications and Pre-prints"
subheadline:  no
teaser: "These are my contributions to the research community"
permalink: "/publications/"
header: no
--- 

<style>
    body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
        background-color: #f4f4f9;
        color: #333;
    }
    .container {
        width: 80%;
        margin: auto;
        padding: 20px;
    }
    .publication {
        background-color: #fff;
        border-radius: 8px;
        padding: 15px;
        margin: 10px 0;
        border: 1px solid #ccc;
        transition: transform 0.2s ease, box-shadow 0.2s ease;
    }
    .publication:hover {
        transform: scale(1.03);
        box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
    }
    .publication h2 {
        font-size: 1.2em;
        margin: 0;
    }
    .meta-info {
        font-size: 0.9em;
        color: #666;
        margin-top: 5px;
    }
    .meta-info a {
        color: #007bff; /* or choose any contrasting color you prefer */
        text-decoration: none;
    }

    .meta-info a:hover {
        color: #0056b3; /* darker shade on hover */
        text-decoration: underline;
    }
    .abstract {
        margin-top: 10px;
    }
    .dropdown-content {
        display: none;
        padding: 10px;
        border-top: 1px solid #eee;
        font-size: 0.9em;
    }
    .dropdown-content p {
        margin: 0;
    }
    .publication .toggle {
        cursor: pointer;
        color: #007bff;
        text-decoration: underline;
        margin-top: 10px;
        display: inline-block;
    }
    .comment {
    font-style: italic;
    color: #555; /* Choose a color that complements the link */
    margin-left: 8px; /* Adds a bit of space between link and comment */
    }
</style>


<div class="container">
    <h1>Publications</h1>
    <!-- Conference Publication Example -->
    <div class="publication">
        <h2>1. ANALOGICAL - A Novel Benchmark for Long Text Analogy Evaluation in Large Language Models</h2>
        <p class="meta-info">
            Type: Conference Publication | Venue: Findings of ACL'23 | <a href="https://aclanthology.org/2023.findings-acl.218/" target="_blank">Link</a> | <a href="https://notebooklm.google.com/notebook/cef26ab6-a31e-44fc-bf6d-a21e04d5576c/audio" target="_blank">NotebookLM Link</a>
            <span class="comment">(This NotebookLM recap is good!)</span>
        </p>
        <div class="abstract">
            <strong>Abstract:</strong> Over the past decade, analogies, in the form of word-level analogies, have played a signifi-cant role as an intrinsic measure of evaluating the quality of word embedding methods such as word2vec. Modern large language models (LLMs), however, are primarily evaluated on extrinsic measures based on benchmarks such as GLUE and SuperGLUE, and there are only a few investigations on whether LLMs can draw analogies between long texts. In this paper, we present ANALOGICAL, a new benchmark to intrinsically evaluate LLMs across a taxonomy of analogies of long text with six levels of com-plexity – (i) word, (ii) word vs. sentence, (iii) syntactic, (iv) negation, (v) entailment, and (vi) metaphor. Using thirteen datasets and three different distance measures, we evaluate the abilities of eight LLMs in identifying analog-ical pairs in the semantic vector space. Our evaluation finds that it is increasingly challeng-ing for LLMs to identify analogies when going up the analogy taxonomy.
        </div>
        <!-- <div class="toggle" onclick="toggleContent(this)">Read More...</div>
        <div class="dropdown-content">
            <p>Additional information about the methods, experiments, and results in detail.</p>
        </div> -->
    </div>
    <!-- Workshop Publication Example -->
    <div class="publication">
        <h2>2. AI-EDI-SPACE: A Co-designed Dataset for Evaluating the Quality of Public Spaces</h2>
        <p class="meta-info">
            Type: Workshop Presentation | Venue: CVPR'24 Workshop on Responsible Data | <a href="https://responsibledata.github.io/#accepted_papers" target="_blank">Link</a> | <a href="https://notebooklm.google.com/notebook/a2c5a771-4df9-42ff-b9b2-c3cc2c34f4f3/audio" target="_blank">NotebookLM Link</a>
            <span class="comment">(This NotebookLM recap is very good!)</span>
        </p>
        <div class="abstract">
            <strong>Abstract:</strong> Advancements in AI heavily rely on large-scale datasets meticulously curated and annotated for training. However, concerns persist regarding the transparency and context of data collection methodologies, especially when sourced through crowdsourcing platforms. Crowdsourcing often employs low-wage workers with poor working conditions and lacks consideration for the representativeness of annotators, leading to algorithms that fail to represent diverse views and perpetuate biases against certain groups. To address these limitations, we propose a methodology involving a co-design model that actively engages stakeholders at key stages, integrating principles of Equity, Diversity, and Inclusion (EDI) to ensure diverse viewpoints. We apply this methodology to develop a dataset and AI model for evaluating public space quality using street view images, demonstrating its effectiveness in capturing diverse perspectives and fostering higher-quality data.
        </div>
        <!-- <div class="toggle" onclick="toggleContent(this)">Read More...</div>
        <div class="dropdown-content">
            <p>Additional information about the methods, experiments, and results in detail.</p>
        </div> -->
    </div>
    <!-- Arxiv Preprints Section -->
    <h2>Arxiv Preprints</h2>
    <div class="publication">
        <h2>From Efficiency to Equity: Measuring Fairness in Preference Learning</h2>
        <p class="meta-info">
            <a href="https://arxiv.org/pdf/2410.18841v1.pdf" target="_blank">Arxiv Link</a> | <a href="https://notebooklm.google.com/notebook/c0afb83e-ec48-4bdc-b8c1-e37ff3707a7d/audio" target="_blank">NotebookLM Link</a>
            <span class="comment">(This NotebookLM recap is decent!)</span>
        </p>
        <div class="abstract">
            <strong>Abstract:</strong> As AI systems, particularly generative models, increasingly influence decision-making, ensuring that they are able to fairly represent diverse human preferences becomes crucial. This paper introduces a novel framework for evaluating epistemic fairness in preference learning models inspired by economic theories of inequality and Rawlsian justice. We propose metrics adapted from the Gini Coefficient, Atkinson Index, and Kuznets Ratio to quantify fairness in these models. We validate our approach using two datasets: a custom visual preference dataset (AI-EDI-Space) and the Jester Jokes dataset. Our analysis reveals variations in model performance across users, highlighting potential epistemic injustices. We explore pre-processing and in-processing techniques to mitigate these inequalities, demonstrating a complex relationship between model efficiency and fairness. This work contributes to AI ethics by providing a framework for evaluating and improving epistemic fairness in preference learning models, offering insights for developing more inclusive AI systems in contexts where diverse human preferences are crucial.
        </div>
        <!-- <div class="toggle" onclick="toggleContent(this)">Read More...</div>
        <div class="dropdown-content">
            <p>Detailed description for the Arxiv preprint with additional insights.</p>
        </div> -->
    </div>
</div>

<script>
    function toggleContent(element) {
        const dropdown = element.nextElementSibling;
        const isVisible = dropdown.style.display === 'block';
        dropdown.style.display = isVisible ? 'none' : 'block';
        element.textContent = isVisible ? 'Read More...' : 'Read Less';
    }
</script>