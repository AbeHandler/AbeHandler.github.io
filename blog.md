---
layout: default
title: Blog
navigation_weight: 2
---

<section class="hero">

</section>

<div class="container">
	<h3 class="spacing">Paper notes</h3>
	<h4> I sometimes post some notes about NLP papers here. Send me an email
	 			if you find them useful, want to talk about them or find a typo or conceptual error!
	</h4>

	<h4>If you want to find out more about me, head <a href="/index.html">back to the main page </a></h4>

	<div class="blog-posts">
		{% for post in site.posts %}
			<div class="blog-post spacing">
				<h3><a href="{{ post.url }}">{{ post.title }}</a></h3>
				<p class="summary">
					{{ post.category }}
					<span class="date">
						{{ post.date | date: '%B %d, %Y' }}
					</span>
				</p>
				{{ post.excerpt }}
			</div>
		{% endfor %}
	</div>
</div>
