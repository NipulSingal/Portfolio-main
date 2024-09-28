;(function () {
	
	'use strict';



	var isMobile = {
		Android: function() {
			return navigator.userAgent.match(/Android/i);
		},
			BlackBerry: function() {
			return navigator.userAgent.match(/BlackBerry/i);
		},
			iOS: function() {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
			Opera: function() {
			return navigator.userAgent.match(/Opera Mini/i);
		},
			Windows: function() {
			return navigator.userAgent.match(/IEMobile/i);
		},
			any: function() {
			return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
		}
	};

	var fullHeight = function() {

		if ( !isMobile.any() ) {
			$('.js-fullheight').css('height', $(window).height());
			$(window).resize(function(){
				$('.js-fullheight').css('height', $(window).height());
			});
		}

	};


	var counter = function() {
		$('.js-counter').countTo({
			 formatter: function (value, options) {
	      return value.toFixed(options.decimals);
	    },
		});
	};


	var counterWayPoint = function() {
		if ($('#colorlib-counter').length > 0 ) {
			$('#colorlib-counter').waypoint( function( direction ) {
										
				if( direction === 'down' && !$(this.element).hasClass('animated') ) {
					setTimeout( counter , 400);					
					$(this.element).addClass('animated');
				}
			} , { offset: '90%' } );
		}
	};

	// Animations
	var contentWayPoint = function() {
		var i = 0;
		$('.animate-box').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('animated') ) {
				
				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function(){

					$('body .animate-box.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							var effect = el.data('animate-effect');
							if ( effect === 'fadeIn') {
								el.addClass('fadeIn animated');
							} else if ( effect === 'fadeInLeft') {
								el.addClass('fadeInLeft animated');
							} else if ( effect === 'fadeInRight') {
								el.addClass('fadeInRight animated');
							} else {
								el.addClass('fadeInUp animated');
							}

							el.removeClass('item-animate');
						},  k * 200, 'easeInOutExpo' );
					});
					
				}, 100);
				
			}

		} , { offset: '85%' } );
	};


	var burgerMenu = function() {

		$('.js-colorlib-nav-toggle').on('click', function(event){
			event.preventDefault();
			var $this = $(this);

			if ($('body').hasClass('offcanvas')) {
				$this.removeClass('active');
				$('body').removeClass('offcanvas');	
			} else {
				$this.addClass('active');
				$('body').addClass('offcanvas');	
			}
		});



	};

	// Click outside of offcanvass
	var mobileMenuOutsideClick = function() {

		$(document).click(function (e) {
	    var container = $("#colorlib-aside, .js-colorlib-nav-toggle");
	    if (!container.is(e.target) && container.has(e.target).length === 0) {

	    	if ( $('body').hasClass('offcanvas') ) {

    			$('body').removeClass('offcanvas');
    			$('.js-colorlib-nav-toggle').removeClass('active');
			
	    	}
	    	
	    }
		});

		$(window).scroll(function(){
			if ( $('body').hasClass('offcanvas') ) {

    			$('body').removeClass('offcanvas');
    			$('.js-colorlib-nav-toggle').removeClass('active');
			
	    	}
		});

	};

	var clickMenu = function() {

		$('#navbar a:not([class="external"])').click(function(event){
			var section = $(this).data('nav-section'),
				navbar = $('#navbar');

				if ( $('[data-section="' + section + '"]').length ) {
			    	$('html, body').animate({
			        	scrollTop: $('[data-section="' + section + '"]').offset().top - 55
			    	}, 500);
			   }

		    if ( navbar.is(':visible')) {
		    	navbar.removeClass('in');
		    	navbar.attr('aria-expanded', 'false');
		    	$('.js-colorlib-nav-toggle').removeClass('active');
		    }

		    event.preventDefault();
		    return false;
		});


	};

	// Reflect scrolling in navigation
	var navActive = function(section) {

		var $el = $('#navbar > ul');
		$el.find('li').removeClass('active');
		$el.each(function(){
			$(this).find('a[data-nav-section="'+section+'"]').closest('li').addClass('active');
		});

	};

	var navigationSection = function() {

		var $section = $('section[data-section]');
		
		$section.waypoint(function(direction) {
		  	
		  	if (direction === 'down') {
		    	navActive($(this.element).data('section'));
		  	}
		}, {
	  		offset: '150px'
		});

		$section.waypoint(function(direction) {
		  	if (direction === 'up') {
		    	navActive($(this.element).data('section'));
		  	}
		}, {
		  	offset: function() { return -$(this.element).height() + 155; }
		});

	};






	var sliderMain = function() {
		
	  	$('#colorlib-hero .flexslider').flexslider({
			animation: "fade",
			slideshowSpeed: 5000,
			directionNav: true,
			start: function(){
				setTimeout(function(){
					$('.slider-text').removeClass('animated fadeInUp');
					$('.flex-active-slide').find('.slider-text').addClass('animated fadeInUp');
				}, 500);
			},
			before: function(){
				setTimeout(function(){
					$('.slider-text').removeClass('animated fadeInUp');
					$('.flex-active-slide').find('.slider-text').addClass('animated fadeInUp');
				}, 500);
			}

	  	});

	};

	var stickyFunction = function() {

		var h = $('.image-content').outerHeight();

		if ($(window).width() <= 992 ) {
			$("#sticky_item").trigger("sticky_kit:detach");
		} else {
			$('.sticky-parent').removeClass('stick-detach');
			$("#sticky_item").trigger("sticky_kit:detach");
			$("#sticky_item").trigger("sticky_kit:unstick");
		}

		$(window).resize(function(){
			var h = $('.image-content').outerHeight();
			$('.sticky-parent').css('height', h);


			if ($(window).width() <= 992 ) {
				$("#sticky_item").trigger("sticky_kit:detach");
			} else {
				$('.sticky-parent').removeClass('stick-detach');
				$("#sticky_item").trigger("sticky_kit:detach");
				$("#sticky_item").trigger("sticky_kit:unstick");

				$("#sticky_item").stick_in_parent();
			}
			

			

		});

		$('.sticky-parent').css('height', h);

		$("#sticky_item").stick_in_parent();

	};

	var owlCrouselFeatureSlide = function() {
		$('.owl-carousel').owlCarousel({
			animateOut: 'fadeOut',
		   animateIn: 'fadeIn',
		   autoplay: true,
		   loop:true,
		   margin:0,
		   nav:true,
		   dots: false,
		   autoHeight: true,
		   items: 1,
		   navText: [
		      "<i class='icon-arrow-left3 owl-direction'></i>",
		      "<i class='icon-arrow-right3 owl-direction'></i>"
	     	]
		})
	};

	$(function(){
		fullHeight();
		counter();
		counterWayPoint();
		contentWayPoint();
		burgerMenu();
		clickMenu();
		navigationSection();
		mobileMenuOutsideClick();
		sliderMain();
		// stickyFunction();
		owlCrouselFeatureSlide();
	
		const apiUrl = 'https://us-central1-portfolio-api-2-4a95a.cloudfunctions.net/api/api/fetch-data';

		// Fetch the data
		fetch(apiUrl)
			.then(response => response.json())
			.then(data => {
				console.log(data)
				// Skills Section
				const skillsContainer = document.getElementById('skills-list');
				const skillFragment = document.createDocumentFragment();
			
				data.skills.forEach(skill => {
					const img = document.createElement('img');
					img.src = skill.icon;
					img.title = skill.name;
					img.style.width = '50px';
					img.style.margin = '10px';
					img.loading = 'lazy'; // Lazy load images
			
					skillFragment.appendChild(img);
				});
			
				// Append all images to the DOM at once
				skillsContainer.appendChild(skillFragment);

				// Work Experience Section
				const workExperienceSection = document.getElementById('work-experience-section');
				data.experiences.forEach((exp, i) => {
          // Create the HTML structure for each work experience
          const timelineEntry = document.createElement('article');
          timelineEntry.classList.add('timeline-entry');

          const timelineEntryInner = document.createElement('div');
          timelineEntryInner.classList.add('timeline-entry-inner');

          const timelineIcon = document.createElement('div');
					const colorClass = `color-${i + 1}`;
          timelineIcon.classList.add('timeline-icon', colorClass);
          timelineIcon.innerHTML = '<i class="icon-pen2"></i>';

          const timelineLabel = document.createElement('div');
          timelineLabel.classList.add('timeline-label');

          const h2 = document.createElement('h2');
          h2.innerHTML = `${exp.title} at <a href="${exp.url}" target="_blank">${exp.company}</a> <span>${exp.start_date} - ${exp.end_date}</span>`;

          const ul = document.createElement('ul');
          exp.description.forEach(responsibility => {
            const li = document.createElement('li');
            li.innerHTML = responsibility;
            ul.appendChild(li);
          });

          timelineLabel.appendChild(h2);
          timelineLabel.appendChild(ul);

					if (exp.certificate && exp.certificate.data.length > 0) {
            const p = document.createElement('p');
            p.textContent = exp.certificate.title;

            exp.certificate.data.forEach((certificate, certIndex) => {
              const a = document.createElement('a');
              a.href = certificate.url;
              a.target = '_blank';
              a.textContent = certificate.name;

              p.appendChild(a);

              // If there are multiple certificates, add a separator between them
              if (certIndex < exp.certificate.data.length - 1) {
                p.innerHTML += ' | '; // Add separator for multiple certificates
              }
            });

            timelineLabel.appendChild(p); // Append the certificate paragraph after the ul
          }

          timelineEntryInner.appendChild(timelineIcon);
          timelineEntryInner.appendChild(timelineLabel);
          timelineEntry.appendChild(timelineEntryInner);

          // Append each timeline entry to the work experience section
          workExperienceSection.appendChild(timelineEntry);
				});


					// Recommendations Section
				const RecommendationsSection = document.getElementById('recommendations-section');
				data.recommendations.forEach((rec, i) => {
          // Create the HTML structure for each work experience
          const timelineEntry = document.createElement('div');
					timelineEntry.classList.add('row');

          const timelineEntryInner = document.createElement('div');
          timelineEntryInner.classList.add('col-md-12', 'col-sm-6');

					const blogEntry = document.createElement('div');
          blogEntry.classList.add('blog-entry');

					const blogEntryInner = document.createElement('div');
          blogEntryInner.classList.add('desc');

					const span = document.createElement('span');
					span.innerHTML = `<small>${rec.date}</small> | <small> ${rec.manager} </small>`

					const h3 = document.createElement('h3');
					h3.innerHTML = `<a href="${rec.linkedin}">${rec.name}, ${rec.title} </a>`

					const p = document.createElement('p');
					p.innerHTML = `${rec.testimonial}`

          blogEntryInner.appendChild(span);
          blogEntryInner.appendChild(h3);
          blogEntryInner.appendChild(p);

          blogEntry.appendChild(blogEntryInner);
          timelineEntryInner.appendChild(blogEntry);
          timelineEntry.appendChild(timelineEntryInner);

          // Append each timeline entry to the work experience section
          RecommendationsSection.appendChild(timelineEntry);
        });

					// Projects Section
					const ProjectsSection = document.getElementById('projects-section');
					data.projects.forEach((proj) => {
						// Create the HTML structure for each work experience
						const timelineEntry = document.createElement('div');
						timelineEntry.classList.add('partition');
	
						const timelineEntryHeader = document.createElement('div');
						timelineEntryHeader.classList.add('col-md-12');
						timelineEntryHeader.innerHTML = `<p class="work-menu" style="font-size: 30px"><span class="active"><strong>${proj.category}</strong></span></p>`;
						timelineEntry.appendChild(timelineEntryHeader)

						const timelineEntryRow = document.createElement('div');
						timelineEntryRow.classList.add('row');
						proj.items.forEach((item) => {
							const projItem = document.createElement('div');
							projItem.classList.add('col-md-4');
							
							const projectEntry = document.createElement('div');
							projectEntry.classList.add('project');
							projectEntry.style.backgroundImage = `url(${item.image})`;

							const desc = document.createElement('div');
							desc.classList.add('desc');

							const con = document.createElement('div');
							con.classList.add('con');

							const h3 = document.createElement('h3');
							h3.innerHTML = `${item.title}`;
		
							const span = document.createElement('span');
							span.innerHTML = `${item.description}`;

							const icons = document.createElement('p');
							icons.classList.add('icon');

							const iconSpan = document.createElement('span');
							iconSpan.innerHTML = `Important Links - `;
							icons.appendChild(iconSpan)

							item.links.forEach((link) => {
								const linkSpan = document.createElement('span');
          			linkSpan.innerHTML = `<a href="${link.url}" target="_blank">${link.name}</a>`;
								icons.appendChild(linkSpan)
							});

							con.appendChild(h3);
							con.appendChild(span);
							con.appendChild(icons);

							desc.appendChild(con);
							projectEntry.appendChild(desc);
							projItem.appendChild(projectEntry);
							timelineEntryRow.appendChild(projItem)
						});
						timelineEntry.appendChild(timelineEntryRow)
						ProjectsSection.appendChild(timelineEntry);
					});

					const educationSection = document.getElementById('education-section');
					const accordionId = 'accordion'; // Id for the accordion
	
					// Create the accordion div container
					const accordionDiv = document.createElement('div');
					accordionDiv.classList.add('panel-group');
					accordionDiv.id = accordionId;
					accordionDiv.setAttribute('role', 'tablist');
					accordionDiv.setAttribute('aria-multiselectable', 'true');
	
					data.educations.forEach((edu, index) => {
						const panelDiv = document.createElement('div');
						panelDiv.classList.add('panel', 'panel-default');
	
						const headingId = `heading${index + 1}`;
						const collapseId = `collapse${index + 1}`;
	
						const panelHeadingDiv = document.createElement('div');
						panelHeadingDiv.classList.add('panel-heading');
						panelHeadingDiv.setAttribute('role', 'tab');
						panelHeadingDiv.id = headingId;
	
						const h4 = document.createElement('h4');
						h4.classList.add('panel-title');
	
						const anchor = document.createElement('a');
						anchor.setAttribute('data-toggle', 'collapse');
						anchor.setAttribute('data-parent', `#${accordionId}`);
						anchor.href = `#${collapseId}`;
						anchor.setAttribute('aria-expanded', index === 0 ? 'true' : 'false');
						anchor.setAttribute('aria-controls', collapseId);
						if (index !== 0) {
							anchor.classList.add('collapsed');
						}
						anchor.textContent = edu.degree;
	
						h4.appendChild(anchor);
						panelHeadingDiv.appendChild(h4);
	
						const collapseDiv = document.createElement('div');
						collapseDiv.id = collapseId;
						collapseDiv.classList.add('panel-collapse', 'collapse');
						collapseDiv.setAttribute('role', 'tabpanel');
						collapseDiv.setAttribute('aria-labelledby', headingId);
	
						if (index === 0) {
							collapseDiv.classList.add('in'); // First panel open by default
						}
	
						const panelBodyDiv = document.createElement('div');
						panelBodyDiv.classList.add('panel-body');
	
						// Adding educational details
						const rowDiv = document.createElement('div');
						rowDiv.classList.add('row');
	
						const colDiv1 = document.createElement('div');
						colDiv1.classList.add('col-md-12');
						colDiv1.innerHTML = `<p>${edu.description} from <strong>${edu.institution}</strong></p>`;
	
						const colDiv2 = document.createElement('div');
						colDiv2.classList.add('col-md-12');
						colDiv2.innerHTML = `<p><strong>${edu.details}</strong></p>`;
	
						rowDiv.appendChild(colDiv1);
						rowDiv.appendChild(colDiv2);
	
						panelBodyDiv.appendChild(rowDiv);
						collapseDiv.appendChild(panelBodyDiv);
	
						panelDiv.appendChild(panelHeadingDiv);
						panelDiv.appendChild(collapseDiv);
	
						accordionDiv.appendChild(panelDiv);
					});
	
					// Append the generated accordion structure to the education section
					educationSection.appendChild(accordionDiv);

					const hobbiesSection = document.getElementById('hobbies-section');

					data.hobbies.forEach((skill, index) => {
						const colElement = document.createElement('div');
						colElement.classList.add('col-md-4', 'text-center');

						const servicesElement = document.createElement('div');
						const colorClass = `color-${index + 1}`;
						servicesElement.classList.add('services', colorClass);  // Add dynamic color class

						const spanElement = document.createElement('span');
						spanElement.classList.add('icon');

						const iconElement = document.createElement('i');
						iconElement.classList.add(skill.iconClass);  // Add dynamic icon class
						spanElement.appendChild(iconElement);

						const descElement = document.createElement('div');
						descElement.classList.add('desc');

						const h3Element = document.createElement('h3');
						h3Element.textContent = skill.title;

						const pElement = document.createElement('p');
						pElement.textContent = skill.description;

						descElement.appendChild(h3Element);
						descElement.appendChild(pElement);

						servicesElement.appendChild(spanElement);
						servicesElement.appendChild(descElement);

						colElement.appendChild(servicesElement);

						hobbiesSection.appendChild(colElement);
					});

					const skillsRowElement = document.getElementById('about-skills');

					data.about[0].skills.forEach((skill, index) => {
						const colElement = document.createElement('div');
						colElement.classList.add('col-md-3');

						const servicesElement = document.createElement('div');
						const colorClass = `color-${index + 1}`;
						servicesElement.classList.add('services', colorClass); // Add dynamic color class

						const spanElement = document.createElement('span');
						spanElement.classList.add('icon2');

						const iconElement = document.createElement('i');
						iconElement.classList.add(skill.iconClass); // Add dynamic icon class
						spanElement.appendChild(iconElement);

						const h3Element = document.createElement('h3');
						h3Element.textContent = skill.title;

						servicesElement.appendChild(spanElement);
						servicesElement.appendChild(h3Element);
						colElement.appendChild(servicesElement);

						skillsRowElement.appendChild(colElement);
					});

					const aboutDescElement = document.getElementById('about-desc');
					const descriptionElement = document.createElement('p');
					descriptionElement.innerHTML = data.about[0].description;
					aboutDescElement.appendChild(descriptionElement);

					const leftPanelElement = document.getElementById('left-panel');
					const spanElement = document.createElement('span');
					spanElement.classList.add('position')
					spanElement.innerHTML = `<a>${data.about[0].title}</a>`;
					const iamgeElement = document.createElement('div');
					iamgeElement.classList.add('author-img')
					iamgeElement.style.backgroundImage = `url(${data.about[0].logo})`;
					const nameElement = document.createElement('h1');
					nameElement.id = 'colorlib-logo'
					nameElement.innerHTML = `<a href="index.html">${data.about[0].name}</a>`
					leftPanelElement.appendChild(iamgeElement);
					leftPanelElement.appendChild(nameElement);
					leftPanelElement.appendChild(spanElement);


					const homePageElement = document.getElementById('home-page');
					const homeName = document.createElement('h1');
					homeName.innerHTML = data.about[0].name
					const homeTitle = document.createElement('h2');
					homeTitle.innerHTML = data.about[0].home_subtitle
					const a = document.createElement('a');
          a.href = data.about[0].resume;
					a.type = 'button'
					a.classList.add('btn', 'btn-primary', 'accent' ,'register', 'btn-lg')
          a.target = '_blank';
					a.innerHTML = `Download CV<i class="icon-download4"></i>`;
					homePageElement.appendChild(homeName);
					homePageElement.appendChild(homeTitle);
					homePageElement.appendChild(a);

					const emailElement = document.getElementById('email');
					const p = document.createElement('p');
					p.innerHTML = `<a href="mailto:${data.about[0].email}">${data.about[0].email}</a>`
					emailElement.append(p)

					const locationElement = document.getElementById('location');
					const location = document.createElement('p');
					location.innerHTML = data.about[0].location
					locationElement.append(location)

					const phoneElement = document.getElementById('phone');
					const phone = document.createElement('p');
					phone.innerHTML = `<a href="tel:${data.about[0].phone}">${data.about[0].phone}</a>`
					phoneElement.append(phone)
					
			})
			.catch(error => {
				console.error('Error fetching data:', error);
			});
		});


}());