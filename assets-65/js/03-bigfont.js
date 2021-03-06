﻿(function () {

    'use strict';
    /*global $:false, document:false, window:false */

    function initializeNavbarCurrentPage() {
        var href, a;
        href = '..' + window.location.pathname;
        a = $('[href="' + href + '"]');
        a.parents('li').addClass('active');
        a.addClass('active');

        // TODO Get this working - it appears to freeze the browser.
        // hack to prevent scrollspy from impacting more than its target nav
        //$("ul.scrollspy-target li").on("activate", function () {
        //    initializeNavbarCurrentPage();
        //});
    }

    function initializeVideoResizing() {

        $(window).resize(function () {

            var video, aspectRatio, height, width;
            aspectRatio = 2 / 3; // equiv of 3:2 aspect ratio
            width = $('article').width() * 80 / 100;
            height = width * aspectRatio;
            video = $('.video');
            video.width(width);
            video.height(height);


        });

        $(window).resize();

    }

    function initializeTheEquipmentList() {
        if (window.location.toString().toLowerCase().indexOf("equipment") >= 0) {
            var stringToAppend, items;

            items = $('strong.equipment-item');
            stringToAppend = '';

            items.each(function (i) {
                stringToAppend += $(this).text();

                if (i !== items.length - 1) {
                    stringToAppend += ', ';
                } else {
                    stringToAppend += '.';
                }
            });


            $('p.equipment-list').append($('<span/>', { text: stringToAppend }));
        }
    }

    function initializeTheSubnavigation() {
        var ul, li, a, icon, href, text, headings, h1;

        // get all the headings
        headings = $('section h1');

        // only add the subnav if we have two or more sections
        if (headings.length < 2) {
            return;
        }

        // get the subnav ul
        ul = $('nav#sub-nav ul');

        headings.each(function (i) {

            // get the h1
            h1 = $(this);

            // set the text and href
            text = h1.text().trim();
            href = encodeURI(text
                .replace(/['"!@#$%^&*()//]/g, '') // replace chars that mess up scrollspy
                .replace(/\s+/g, '-') // replace white space with single dash
                .toLowerCase());

            // create 
            li = $('<li/>', { 'class': 'tab' });
            a = $('<a/>', { href: '#' + href, text: text });
            icon = $('<i/>', { 'class': 'icon-chevron-right' });

            // assemble
            a.prepend(icon); // we need to prepend otherwise nonsense happens, hmmm.
            li.append(a);
            ul.append(li);

            // set the section id
            h1.parents('section').attr('id', href);

        });

        // refresh scrollspy (maybe necessary)
        $('[data-spy="scroll"]').each(function () {
            $(this).scrollspy('refresh');
        });

        // create and append the return to top link
        li = $('<li/>', { 'class': 'tab' });
        a = $('<a/>', { href: '#top', text: 'Return to Top' });
        li.append(a);
        ul.append(li);

    }

    function initializeTheCarousel() {
        $('.carousel').carousel({
            interval: 5000
        });
    }

    $(document).ready(function () {

        initializeTheCarousel();
        initializeTheSubnavigation();
        initializeTheEquipmentList();
        initializeVideoResizing();
        initializeNavbarCurrentPage();
        // addHorizontalRuleAfterEachSection();
    });

}());